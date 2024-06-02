import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si no hay roles definidos, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Header de autorización no encontrado.');
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new UnauthorizedException('Encabezado de autorización inválido.');
    }

    const token = tokenParts[1];

    try {
      const payload = this.jwtService.verify(token);

      // Verificar si el userType está en los roles permitidos
      if (!roles.includes(payload.userType)) {
        throw new UnauthorizedException('No tienes permisos (Roles)');
      }

      // Agregar el payload decodificado del token a la solicitud para uso posterior
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

