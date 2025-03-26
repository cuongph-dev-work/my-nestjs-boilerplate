import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RequestWithUser } from 'src/types/request.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req: RequestWithUser) {
    return this.authService.signIn(req.user);
  }

  @Get('user-info')
  userInfo(@Req() req: RequestWithUser) {
    return this.authService.userInfo(req.user);
  }
}
