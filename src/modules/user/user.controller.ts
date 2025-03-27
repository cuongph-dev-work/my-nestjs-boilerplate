import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { USER_ROLE } from '@configs/enum/user';
import { Roles } from '@decorators/role.decorator';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles([USER_ROLE.ADMIN])
  @Post('/')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Roles([USER_ROLE.ADMIN])
  @Get('/:id')
  showUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Roles([USER_ROLE.ADMIN])
  @Patch('/:id')
  editUserProfile(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Roles([USER_ROLE.ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Roles([USER_ROLE.ADMIN])
  @Get('/')
  getUsers(@Query() query: SearchUserDto) {
    return this.userService.getUsers(query);
  }
}
