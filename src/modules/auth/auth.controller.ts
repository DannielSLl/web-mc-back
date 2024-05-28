import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClienteDTO } from '../clientes/dto/cliente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';
import { IPostClienteResponse } from '../clientes/dto/iPostClienteResponse';
import * as bcrypt from 'bcryptjs';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private clienteService: ClientesService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('signup')
  async signUp(@Body() request: ClienteDTO): Promise<IPostClienteResponse> {
    const response: IPostClienteResponse = {
      data: null,
      statusCode: 200,
      statusDescripcion: 'usuario agregado',
      error: null
  };

  if (request) {
      //Encriptar contraseña 
      const hashedPassword = await bcrypt.hash(request.password, 10);

      //Crear nuevo usuario
      const newCliente: ClienteEntity = {
          name: request.name,
          lastname: request.lastname,
          email: request.email,
          phone: request.phone,
          password: hashedPassword,
          puntos: 0 
      } as ClienteEntity;

      await this.clienteService.create(newCliente);

      return response;
  }
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    const token = await this.authService.signIn(authCredentialsDto);
    
    return { token };
  }
}
