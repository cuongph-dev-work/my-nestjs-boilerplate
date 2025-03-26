import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dtos';
// import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async findAll(): Promise<UserResponseDto[]> {
  //   const users = await this.userService.findAll();
  //   return users.map((user) => plainToInstance(UserResponseDto, user));
  // }

  // @Get(':id')
  // async findOne(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.findById(id);
  //   return plainToInstance(UserResponseDto, user);
  // }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
  //   const user = await this.userService.create(createUserDto);
  //   return plainToInstance(UserResponseDto, user);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<UserResponseDto> {
  //   const user = await this.userService.update(id, updateUserDto);
  //   return plainToInstance(UserResponseDto, user);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   await this.userService.softDelete(id);
  // }
}
