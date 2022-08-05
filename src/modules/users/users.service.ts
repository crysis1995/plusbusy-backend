import { Injectable } from '@nestjs/common';
import { Users, UsersBuilder, UserType } from './entities/users.entity';
import { CreateUserDto, CreateUserSchema } from './dtos/create-user.dto';
import { EmailSchema, NickSchema, UserByNickOrEmailDto } from './dtos/user-by-nick-or-email.dto';
import { UserBadDataExceptionException } from './exceptions/user-bad-data.exception.exception';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
@InjectRepository(Users)
private usersRepository:Repository<Users>


    async findById(Id: UserType['Id']) {
        return this.usersRepository.findBy({Id});
    }

    async findByEmailOrNick(value: UserByNickOrEmailDto) {
        let result: UserType = null;
        if (EmailSchema.safeParse(value.UserName).success) {
            result = await this.usersRepository.findOne({where:{Email:value.UserName}});
        } else if (NickSchema.safeParse(value.UserName).success) {
            result = await this.usersRepository.findOne({where:{Nick:value.UserName}});
        }
        if (result === null) throw new UserBadDataExceptionException(value);
        return result;
    }

    async createUser(dto: CreateUserDto) {
        const validatedData = CreateUserSchema.parse(dto);
    }
}
