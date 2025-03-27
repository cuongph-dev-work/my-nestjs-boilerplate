import { Body, Controller, Get, Param, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_ROLE } from '@configs/enum/user';
import { Roles } from '@decorators/role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Roles([USER_ROLE.SALE])
  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Version('1')
  @Roles([USER_ROLE.SALE])
  @Get('/:id')
  showUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
