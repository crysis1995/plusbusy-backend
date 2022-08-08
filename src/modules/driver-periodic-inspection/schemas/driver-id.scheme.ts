import { z } from 'nestjs-zod/z';

export const DriverIdScheme = z.number().int();
