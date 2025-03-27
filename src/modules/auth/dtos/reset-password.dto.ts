import { StringField } from '@decorators/validation/string.decorator';

export class ResetPasswordDto {
  @StringField({
    isEmail: true,
    max: 255,
  })
  email: string;
}
