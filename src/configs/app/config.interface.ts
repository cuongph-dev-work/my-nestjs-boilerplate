import { NODE_ENV } from '@configs/enum/app';

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
  redisPassword: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
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
