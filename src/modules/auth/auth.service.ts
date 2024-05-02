import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from '../clientes/cliente.entity';
import { AuthCredentialsDto } from './dto/authCredentialsDTO';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, 10);

    // Crear un nuevo usuario
    const newUser = this.clienteRepository.create({
      email: authCredentialsDto.email,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    await this.clienteRepository.save(newUser);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // Buscar al usuario por su correo electrónico
    const user = await this.clienteRepository.findOne({ email: authCredentialsDto.email });

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
