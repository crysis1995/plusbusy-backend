import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

export const CreateTestingModuleUtil = (...entities) => {
    return Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'sqlite',
                database: ':memory:',
                dropSchema: true,
                entities,
                synchronize: true
            }),
            TypeOrmModule.forFeature(entities)
        ]
    }).compile();
};
