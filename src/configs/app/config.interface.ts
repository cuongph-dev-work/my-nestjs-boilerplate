import { NODE_ENV } from '@constants/app.constant';

export interface Config {
  database: DatabaseConfig;
  app: AppConfig;
  jwt: JwtConfig;
  mail: MailConfig;
}

export interface AppConfig {
  name: string;
  nodeEnv: NODE_ENV;
  port: number;
  fallbackLanguage: string;
  headerLanguage: string;
  redisHost: string;
  redisPort: number;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  expiresIn: string;
  refreshIn: string;
}

export interface MailConfig {
  provider: string;
  mailFrom: string;
  maildev: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  gmail: {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
  };
  frontendUrl: string;
}
