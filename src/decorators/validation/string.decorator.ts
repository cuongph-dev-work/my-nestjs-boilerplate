import {
  IsString,
  ValidationOptions,
  MinLength,
  MaxLength,
  IsEmail,
  IsUrl,
  IsPhoneNumber,
  Matches,
  IsNotEmpty,
  IsNumberString,
  ValidateBy,
  ValidationArguments,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { applyDecorators } from '@nestjs/common';
import * as ValidatorJS from 'validator';
import { Trim } from '@decorators/transform.decorator';
import { ConfigService } from '@nestjs/config';
import configs from '@configs/app';

const configService = new ConfigService(configs());

interface IStringValidationOption {
  min?: number;
  max?: number;
  trim?: boolean;
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
  options?: IStringValidationOption,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  const {
    min,
    max,
    trim,
    allowEmpty,
    isEmail,
    isPhone,
    isUrl,
    isPassword,
    isNumberString,
    emailOptions,
    urlOptions,
    numericOptions,
    phoneOptions,
  } = options || {};

  const decorators = [
    IsString({
      message:
        validationOptions?.message ||
        i18nValidationMessage('validation.string', {
          property: '$property',
        }),
      ...validationOptions,
    }),
  ];

  if (trim) {
    decorators.push(Trim());
  }

  if (!allowEmpty) {
    decorators.push(
      IsNotEmpty({
        message: i18nValidationMessage('validation.IsNotEmpty', {
          property: '$property',
        }),
      }),
    );
  }

  if (min) {
    decorators.push(
      MinLength(min, {
        message: i18nValidationMessage('validation.MinLength', {
          property: '$property',
          constraints: [min],
        }),
      }),
    );
  }

  if (max) {
    decorators.push(
      MaxLength(max, {
        message: i18nValidationMessage('validation.MaxLength', {
          property: '$property',
          constraints: [max],
        }),
      }),
    );
  }

  if (isEmail) {
    decorators.push(
      IsEmail(emailOptions, {
        message: i18nValidationMessage('validation.IsEmail', {
          property: '$property',
        }),
      }),
    );
  }

  if (isUrl) {
    decorators.push(
      IsUrl(urlOptions, {
        message: i18nValidationMessage('validation.IsUrl', {
          property: '$property',
        }),
      }),
    );
  }

  if (isPhone) {
    decorators.push(
      IsPhoneNumber(phoneOptions, {
        message: i18nValidationMessage('validation.IsPhoneNumber', {
          property: '$property',
        }),
      }),
    );
  }

  if (isPassword) {
    decorators.push(
      IsPassword({
        message: i18nValidationMessage('validation.IsPassword'),
      }),
    );
  }

  if (isNumberString) {
    decorators.push(
      IsNumberString(numericOptions, {
        message: i18nValidationMessage('validation.IsNumber'),
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
