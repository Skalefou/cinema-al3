import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface RequestUser {
  userId: string;
  email: string;
  roles: string[];
}

interface RequestWithUser extends Request {
  user: RequestUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );


    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user?.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException('Rôle manquant dans le token.');
    }

    const hasRole = user.roles.some(role =>
      requiredRoles.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException('Accès réservé à un rôle supérieur.');
    }

    return true;
  }
}