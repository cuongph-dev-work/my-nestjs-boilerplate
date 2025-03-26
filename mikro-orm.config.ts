import { defineConfig, LoadStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config as configDotEnv } from 'dotenv';
import { Migrator } from '@mikro-orm/migrations';

// Load environment variables from .env file
configDotEnv({ path: `${__dirname}/.env` });
/**
 * MikroORM Config file - used for CLI operations like migrations
 * This configuration mirrors the service configuration used in the NestJS application
 */
export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'postgres',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    glob: '!(*.d).{js,ts}',
  },
  seeder: {
    path: 'dist/database/seeds',
    pathTs: 'src/database/seeds',
    glob: '!(*.d).{js,ts}',
    defaultSeeder: 'DatabaseSeeder',
    emit: 'ts',
  },
  // debug: process.env.NODE_ENV === 'development',
  // loadStrategy: LoadStrategy.JOINED,
  // allowGlobalContext: true,
  // validateRequired: true,
  // strict: true,
  // pool: {
  //   min: 2,
  //   max: 10,
  // },
  extensions: [Migrator],
});
