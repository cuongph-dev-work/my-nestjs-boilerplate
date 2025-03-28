import { USER_ROLE } from '@configs/enum/user';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<USER_ROLE[]>();
