import { Controller, Post, Body, ValidationPipe, UsePipes, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClienteDTO } from '../clientes/dto/cliente.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: ClienteDTO })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: ClienteDTO): Promise<IPostClienteResponse> {
    const response: IPostClienteResponse = {
      data: null,
      statusCode: HttpStatus.CREATED,
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
      response.data = newCliente;
      return response;
  }
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', type: String })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({ type: AuthCredentialsDto })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    const token = await this.authService.signIn(authCredentialsDto);
    
    return { token };
  }
}
