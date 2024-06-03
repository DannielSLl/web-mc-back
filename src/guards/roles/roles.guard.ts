import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Injectable()
@ApiBearerAuth() 
@ApiUnauthorizedResponse({ description: 'No se proporcionó el token JWT válido' }) 
@ApiForbiddenResponse({ description: 'No tienes los permisos necesarios para acceder a este recurso' }) 

export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; 
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

      if (!roles.includes(payload.userType)) {
        throw new UnauthorizedException('No tienes permisos (Roles)');
      }

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
