import { EntitySchema, MixedList } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function createTestConfiguration(
    entities: MixedList<string | Function | EntitySchema<any>>
): TypeOrmModuleOptions {
    return {
        type: 'sqlite',
        database: ':memory:',
        entities,
        dropSchema: true,
        synchronize: true
    };
}
