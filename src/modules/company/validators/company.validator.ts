import { z } from 'nestjs-zod/z';
import { UserSchema } from '../../users/entities/users.entity';

export const CompanySchema = z.object({
    Id: z.string().uuid(),
    Name: z.string(),
    AdminId: z.number().int(),
    Admin: UserSchema
});
export type CompanyType = z.infer<typeof CompanySchema>;
