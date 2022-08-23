import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    async createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> {
        return new Promise((resolve) =>
            exec('docker --version', (error) =>
                resolve(error ? this.getSQLite() : this.getPostgres())
            )
        );
    }

    getPostgres(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.config.get<string>('DATABASE_HOST'),
            port: this.config.get<number>('DATABASE_PORT'),
            database: this.config.get<string>('DATABASE_NAME'),
            username: this.config.get<string>('DATABASE_USER'),
            password: this.config.get<string>('DATABASE_PASSWORD'),
            dropSchema: true,
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
            dropSchema: true,
            logger: 'file',
            synchronize: true
        };
    }
}
