import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return this.getSQLite();
    }

    getPostgres(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.config.get<string>('DATABASE_HOST'),
            port: this.config.get<number>('DATABASE_PORT'),
            database: this.config.get<string>('DATABASE_NAME'),
            username: this.config.get<string>('DATABASE_USER'),
            password: this.config.get<string>('DATABASE_PASSWORD'),
            entities: ['dist/**/*.entity.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true
        };
    }
    getSQLite(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: this.config.get<string>('DATABASE_NAME'),
            entities: ['dist/**/*.entity.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true
        };
    }
}
