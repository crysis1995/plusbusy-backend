import { z } from 'nestjs-zod/z';

export const PhoneSchema = z.string().min(9).max(12).optional();
