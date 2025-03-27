import {
  IsString,
  ValidationOptions,
  MinLength,
  MaxLength,
  IsEmail,
  IsUrl,
  IsNotEmpty,
  IsNumberString,
  ValidateBy,
  ValidationArguments,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import * as ValidatorJS from 'validator';
import { Trim } from '@decorators/transform.decorator';
import { ConfigService } from '@nestjs/config';
import configs from '@configs/app';
import { isEmpty, isNil } from 'lodash';
import { transformValidationErrors } from '@utils/helper';

const configService = new ConfigService(configs());

interface IStringValidationOption {
  min?: number;
  max?: number;
  trim?: boolean;
  isOptional?: boolean;
  allowEmpty?: boolean;
  isEmail?: boolean;
  isPhone?: boolean;
  isUrl?: boolean;
  isPassword?: boolean;
  isNumberString?: boolean;
  emailOptions?: ValidatorJS.IsEmailOptions;
  urlOptions?: ValidatorJS.IsURLOptions;
  numericOptions?: ValidatorJS.IsNumericOptions;
  phoneOptions?: ValidatorJS.IsPhoneNumberOptions;
}

export const StringField = (
  options: Partial<IStringValidationOption> = {},
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const {
    min,
    max,
    trim,
    isOptional,
    allowEmpty,
    isEmail,
    isPhone,
    isUrl,
    isPassword,
    isNumberString,
    emailOptions,
    urlOptions,
    numericOptions,
    phoneOptions = {
      defaultCountry: 'VN',
    },
  } = options || {};

  const decorators = [
    ...(isOptional
      ? [
          IsOptional(),
          ValidateIf((_, value) => {
            return !isNil(value) && !isEmpty(value);
          }),
        ]
      : []),
    IsString({
      message:
        validationOptions?.message || transformValidationErrors('IsString', {}),
      ...validationOptions,
    }),
  ];

  if (trim) {
    decorators.push(Trim());
  }

  if (!allowEmpty) {
    decorators.push(
      IsNotEmpty({
        message: transformValidationErrors('IsNotEmpty', {}),
      }),
    );
  }

  if (min) {
    decorators.push(
      MinLength(min, {
        message: transformValidationErrors('MinLength', {
          min,
        }),
      }),
    );
  }

  if (max) {
    decorators.push(
      MaxLength(max, {
        message: transformValidationErrors('MaxLength', {
          max,
        }),
      }),
    );
  }

  if (isEmail) {
    decorators.push(
      IsEmail(emailOptions, {
        message: transformValidationErrors('IsEmail', {}),
      }),
    );
  }

  if (isUrl) {
    decorators.push(
      IsUrl(urlOptions, {
        message: transformValidationErrors('IsUrl', {}),
      }),
    );
  }

  if (isPhone) {
    decorators.push(IsPhoneNumber());
  }

  if (isPassword) {
    decorators.push(
      IsPassword({
        message: transformValidationErrors('IsPassword', {}),
      }),
    );
  }

  if (isNumberString) {
    decorators.push(
      IsNumberString(numericOptions, {
        message: transformValidationErrors('IsNumber', {}),
      }),
    );
  }

  return applyDecorators(...decorators);
};

const IsPassword = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return ValidateBy(
    {
      name: 'IsPassword',
      constraints: [
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      ],
      validator: {
        validate(value: string, args: ValidationArguments) {
          const passwordPattern = args.constraints[0];
          if (!passwordPattern) return true;

          if (passwordPattern instanceof RegExp) {
            return passwordPattern.test(value);
          }
          const regex = new RegExp(passwordPattern);
          return regex.test(value);
        },
      },
    },
    validationOptions,
  );
};

const IsPhoneNumber = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return ValidateBy(
    {
      name: 'IsPhoneNumber',
      validator: {
        validate(value: string) {
          return ValidatorJS.isMobilePhone(value, 'vi-VN');
        },
        defaultMessage: () => {
          return transformValidationErrors('IsPhoneNumber', {});
        },
      },
    },
    validationOptions,
  );
};
