import { StringField } from '@decorators/validation/string.decorator';

export class UpdateUserDto {
  @StringField({
    isOptional: true,
    max: 255,
  })
  first_name: string;

  @StringField({
    isOptional: true,
    max: 255,
  })
  middle_name: string;

  @StringField({
    isOptional: true,
    max: 255,
  })
  last_name: string;

  @StringField({
    isOptional: true,
    isPhone: true,
    max: 13,
  })
  phone: string;
}
