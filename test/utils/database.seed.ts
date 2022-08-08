import { DataSource } from 'typeorm';
import { Users } from '../../src/modules/users/entities/users.entity';
import { users } from './seeders/users.seed';
import { Company } from '../../src/modules/company/entities/company.entity';
import { companies } from './seeders/company.seed';

export async function DatabaseSeed(dataSource: DataSource) {
    const entityManager = dataSource.createEntityManager();

    await entityManager.insert<Users>(Users, users);
    await entityManager.insert<Company>(Company, companies);
}
