import {
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';

export class RolesGuard implements CanActivate {
  private logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // if (user.role !== USER_ROLE.SALE) {
    //   throw new UnauthorizedException();
    // }
    return true;
  }
}
