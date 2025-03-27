import { formatDate, toISOString } from '@utils/date';
import { Transform } from 'class-transformer';
import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';
import { isArray, isNil, map, trim, castArray } from 'lodash';

export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    if (isArray(value)) {
      return map(value, (v) => trim(v).replace(/\s\s+/g, ' '));
    }

    return trim(value).replace(/\s\s+/g, ' ');
  });
}

export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return params.value;
      }
    },
    { toClassOnly: true },
  );
}

export function ToDate(): PropertyDecorator {
  return Transform(
    (params) => {
      return formatDate(params.value, 'YYYY-MM-DD');
    },
    { toClassOnly: true },
  );
}

export function ToDateISOString(): PropertyDecorator {
  return Transform(
    (params) => {
      return toISOString(params.value);
    },
    { toClassOnly: true },
  );
}

export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      if (isNil(params.value)) {
        return;
      }

      const value = params.value as string;
      return Number.parseInt(value, 10);
    },
    { toClassOnly: true },
  );
}

export function ToNumber(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string;

      return Number(value);
    },
    { toClassOnly: true },
  );
}

export function ToFloat(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string;
      return Number.parseFloat(value);
    },
    { toClassOnly: true },
  );
}

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}
