import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientesService } from '../clientes/clientes.service'; // Importa el servicio de clientes
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService, // Inyecta el servicio de clientes
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.clientesService.findOneByEmail(authCredentialsDto.email);
    if (user && (await bcrypt.compare(authCredentialsDto.password, user.password))) {
      const payload = { email: user.email };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}

