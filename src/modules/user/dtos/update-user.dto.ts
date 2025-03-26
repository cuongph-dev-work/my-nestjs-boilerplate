import { IsEnum, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from '../../../configs/enum/user';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  middle_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: USER_ROLE;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
