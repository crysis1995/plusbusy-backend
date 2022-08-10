import { z } from 'nestjs-zod/z';

export const CompanyIdSchema = z.string().uuid()