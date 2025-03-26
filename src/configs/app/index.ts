import { config as configDotEnv } from 'dotenv';
import { Config } from './config.interface';
import { NODE_ENV } from '@configs/enum/app';

configDotEnv();
const configs = (): Config => {
  return {
    app: {
      name: process.env.APP_NAME || 'APP NAME',
      nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.PRODUCTION,
      port: +(process.env.APP_PORT || '3000'),
      fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'vi',
      headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
      redisHost: process.env.REDIS_HOST || 'localhost',
      redisPort: parseInt(process.env.REDIS_PORT || '6379'),
    },
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'postgres',
    },
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
      refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      refreshIn: process.env.JWT_REFRESH_IN || '1d',
    },
    mail: {
      provider: process.env.MAIL_PROVIDER || 'maildev',
      mailFrom: process.env.MAIL_FROM || 'mail@example.com',
      maildev: {
        host: process.env.MAILDEV_HOST || 'localhost',
        port: parseInt(process.env.MAILDEV_PORT || '1025'),
        username: process.env.MAILDEV_USERNAME || 'maildev',
        password: process.env.MAILDEV_PASSWORD || 'maildev',
      },
      gmail: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: Boolean(process.env.SMTP_SECURE) || false,
        username: process.env.SMTP_USERNAME || 'your-email@gmail.com',
        password: process.env.SMTP_PASSWORD || 'your-password',
      },
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  };
};

export default configs;
