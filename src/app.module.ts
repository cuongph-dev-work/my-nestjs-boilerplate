import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as Joi from 'joi';
import configs from '@configs/app';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from '@nestjs/schedule';
import { BullConfigService } from '@configs/service/bull.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from '@configs/service/mikro-orm.service';
import modules from './modules';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        APP_PORT: Joi.number().required(),
        APP_FALLBACK_LANGUAGE: Joi.string().default('en').required(),
        APP_HEADER_LANGUAGE: Joi.string().default('en').required(),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),

        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_REFRESH_IN: Joi.string().required(),
      }),
      isGlobal: true,
      load: [configs],
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get<string>(
          'app.fallbackLanguage',
          'vi',
        ),
        loaderOptions: {
          path: join(__dirname, 'i18n'),
          watch: true,
        },
        typesOutputPath: join(process.cwd(), 'src/generated/i18n.generated.ts'),
        viewEngine: 'hbs',
      }),
      resolvers: [
        new QueryResolver(['lang', 'locale', 'l']),
        new CookieResolver(),
        new HeaderResolver(['lang']),
        new AcceptLanguageResolver(),
      ],
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    ScheduleModule.forRoot(),
    ...modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AppModule {}
