import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    Id: number;

    @Expose()
    Email: string;

    @Expose()
    IsEmailConfirmed: boolean;

    @Exclude()
    Password: string;

    @Expose()
    Nick?: string;

    @Expose()
    CreatedAt: Date;

    @Expose()
    UpdatedAt: Date;
}
