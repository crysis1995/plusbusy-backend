import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const BasicUserDtoScheme = z.object({
    UserId: z.number().int(),
    UserEmail: z.string().email()
});
export type BasicUserDtoType = z.infer<typeof BasicUserDtoScheme>;

export class BasicUserDto extends createZodDto(BasicUserDtoScheme) {
    constructor(
        UserId: BasicUserDtoType['UserId'],
        UserEmail: BasicUserDtoType['UserEmail']
    ) {
        super();
        this.UserId = UserId;
        this.UserEmail = UserEmail;
    }
}
