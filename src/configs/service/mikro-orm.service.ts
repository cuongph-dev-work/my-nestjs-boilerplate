import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MikroOrmModuleSyncOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { LoadStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

/**
 * Service responsible for configuring the MikroORM module
 * Provides centralized configuration for database connections and ORM settings
 */
@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates the MikroORM options configuration
   * @returns MikroORM configuration options
   */
  createMikroOrmOptions(): MikroOrmModuleSyncOptions {
    // Override with NestJS config service values
    return {
      driver: PostgreSqlDriver,
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      user: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      dbName: this.configService.get<string>('database.database'),
      debug: this.configService.get('app.nodeEnv') === 'development',
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
      loadStrategy: LoadStrategy.JOINED,
      allowGlobalContext: true,
      validateRequired: true,
      strict: true,
      pool: {
        min: 2,
        max: 10,
      },

      autoLoadEntities: false,
    };
  }
}
