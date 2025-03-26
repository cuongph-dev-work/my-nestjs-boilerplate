import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { formatErrors } from '@utils/format-error-http';
import { ConfigService } from '@nestjs/config';
import {
  I18nValidationExceptionFilter,
  i18nValidationErrorFactory,
  I18nService,
} from 'nestjs-i18n';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'debug', 'log'],
  });
  app.use(compression());
  app.use(helmet());
  app.useLogger(app.get(Logger));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('/api');
  app.enableCors();

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: formatErrors,
      errorHttpStatusCode: 422,
    }),
    new HttpExceptionFilter(app.get(ConfigService), app.get(I18nService)),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get('app.port') || 3000, () => {
    logger.log(`Application running on port ${configService.get('app.port')}`);
  });
}

void bootstrap();
