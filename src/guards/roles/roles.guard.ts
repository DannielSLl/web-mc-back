import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { jwtConstanst } from 'src/jwtConstants';

@Injectable()
@ApiBearerAuth() 
@ApiUnauthorizedResponse({ description: 'No se proporcionó el token JWT válido' }) 
@ApiForbiddenResponse({ description: 'No tienes los permisos necesarios para acceder a este recurso' }) 

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new HttpException("Acces_Token_not_found", HttpStatus.UNAUTHORIZED)
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstanst.secret
        }
      );

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    if (requiredRoles.some((role) => request['user'].userType === role)){
      return true;
    }else{
      throw new HttpException("ROLE_NOT_AUTHORIZED", 403)
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}