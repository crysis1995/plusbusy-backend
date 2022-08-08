import { UsersBuilder } from '../../../src/modules/users/entities/users.entity';

export const user1 = new UsersBuilder()
    .setId(1)
    .setEmail('krzysztofkaczor95@gmail.com')
    .setNick('crysis95')
    .setPassword('krzys19950')
    .setIsEmailConfirmed(true)
    .build();
export const user2 = new UsersBuilder()
    .setId(2)
    .setEmail('asdasd@asd.com')
    .setNick('jasiu001')
    .setPassword('rD0krch')
    .setIsEmailConfirmed(true)
    .build();

export const users = [user1, user2];
