import { z } from 'nestjs-zod/z';

export const SeatsCountSchema = z.number().int()