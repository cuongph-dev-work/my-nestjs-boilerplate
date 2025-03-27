import { StringField } from '@decorators/validation/string.decorator';

export class SearchUserDto {
  @StringField({
    isOptional: true,
  })
  email?: string;

  @StringField({
    isOptional: true,
  })
  phone?: string;

  @StringField({
    isOptional: true,
    isNumberString: true,
    toInt: true,
  })
  page?: number;

  @StringField({
    isOptional: true,
    isNumberString: true,
    toInt: true,
  })
  limit?: number;
}
