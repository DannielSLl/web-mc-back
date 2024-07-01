import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClienteDTO } from '../clientes/dto/cliente.dto';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clienteService: ClientesService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    type: ClienteEntity,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: ClienteDTO })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: ClienteDTO): Promise<ClienteEntity> {
    const hashedPassword = await bcrypt.hash(request.password, 10);

    const newCliente: ClienteEntity = {
      name: request.name,
      lastname: request.lastname,
      email: request.email,
      phone: request.phone,
      password: hashedPassword,
      puntos: 0,
    } as ClienteEntity;

    return await this.clienteService.create(newCliente);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({ type: AuthCredentialsDto })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.signIn(authCredentialsDto);
    return { token };
  
  }
}
