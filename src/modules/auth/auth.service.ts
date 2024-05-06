import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientesService } from '../clientes/clientes.service'; // Importa el servicio de clientes
import { AuthCredentialsDto } from './dto/authCredentialsDTO';
import { ClienteDTO } from '../clientes/dto/cliente.dto';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService, // Inyecta el servicio de clientes
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // Buscar al usuario por su correo electrónico utilizando el servicio de clientes
    const user = await this.clientesService.findOneByEmail(authCredentialsDto.email);

    // Verificar si el usuario existe y la contraseña es correcta
    if (user && await bcrypt.compare(authCredentialsDto.password, user.password)) {
      // Generar y devolver el token JWT
      const payload = { email: user.email };
      return this.jwtService.sign(payload);
    } else {
      // Si las credenciales son incorrectas, lanzar un error
      throw new Error('Credenciales inválidas');
    }
  }
}

