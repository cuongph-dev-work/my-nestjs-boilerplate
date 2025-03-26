import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { isEmpty } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const lang = host.switchToHttp().getRequest().i18nLang;

    // Determine the status code and message
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception instanceof HttpException ? exception.message : '';

    // Log the error with relevant details
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : '',
      HttpExceptionFilter.name,
    );

    if (isEmpty(message)) {
      switch (status as HttpStatus) {
        case HttpStatus.BAD_REQUEST:
          message = this.i18n.t('app.http.badRequest');
          break;
        case HttpStatus.UNAUTHORIZED:
          message = this.i18n.t('app.http.unauthorized');
          break;
        case HttpStatus.FORBIDDEN:
          message = this.i18n.t('app.http.forbidden');
          break;
        case HttpStatus.NOT_FOUND:
          message = this.i18n.t('app.http.notFound');
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          message = this.i18n.t('app.http.internalServerError');
          break;
      }
    }

    // Create a consistent error response structure
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      ...(this.configService.get('app.nodeEnv') === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    // Send the error response
    response.status(status).json(errorResponse);
  }
}
