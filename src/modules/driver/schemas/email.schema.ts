import { z } from 'nestjs-zod/z';

export const EmailSchema = z.string().email();
