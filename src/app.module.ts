import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { I18nConfigService } from '@configs/service/i18n.service';
import { BullConfigService } from '@configs/service/bull.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from '@configs/service/mikro-orm.service';

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
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().required(),

        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
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
      useClass: I18nConfigService,
      resolvers: [
        new QueryResolver(['lang', 'locale', 'l']),
        new CookieResolver(),
        new HeaderResolver(['lang']),
        new AcceptLanguageResolver(),
      ],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
    }),
    ScheduleModule.forRoot(),
    // ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
