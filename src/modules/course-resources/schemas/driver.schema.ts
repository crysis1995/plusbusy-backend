import { z } from 'nestjs-zod/z';

export const DriverSchema = z.number().int().positive();
