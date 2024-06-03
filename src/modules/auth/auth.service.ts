import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientesService } from '../clientes/clientes.service'; 
import { AdminService } from '../admin/admin.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClienteEntity } from '../clientes/cliente.entity';
import { AdminEntity } from '../admin/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService, 
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signInn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.clientesService.findOneByEmail(authCredentialsDto.email);
    if (user && (await bcrypt.compare(authCredentialsDto.password, user.password))) {
      const payload = { email: user.email };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password, userType } = authCredentialsDto;

    let user: ClienteEntity | AdminEntity; 
    if (userType === 'cliente') {
      user = await this.clientesService.findOneByEmail(email);
    } else if (userType === 'admin') {
      user = await this.adminService.findOneByEmail(email);
    }

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { id: user.id, email: user.email, userType };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}

