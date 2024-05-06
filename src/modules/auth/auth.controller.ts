import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClienteDTO } from '../clientes/dto/cliente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';
import { IPostClienteResponse } from '../clientes/dto/iPostClienteResponse';
import * as bcrypt from 'bcryptjs';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private clienteService: ClientesService) {}

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
          puntos: request.puntos, 
      } as ClienteEntity;

      await this.clienteService.create(newCliente);

      return response;
  }
  }

  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.signIn(authCredentialsDto);
    return { accessToken };
  }
}
