import { z } from 'nestjs-zod/z';

export const DriverIdSchema = z.number().int();
