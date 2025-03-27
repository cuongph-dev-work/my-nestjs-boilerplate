import { Controller, Get, Post, Req, UseGuards, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RequestWithUser } from 'src/types/request.type';
import { Public } from '@decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Version('1')
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() req: RequestWithUser) {
    return this.authService.signIn(req.user);
  }

  @Version('1')
  @Get('user-info')
  userInfo(@Req() req: RequestWithUser) {
    return this.authService.userInfo(req.user);
  }
}
