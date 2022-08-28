import { z } from 'nestjs-zod/z';

export const VehicleSchema = z.number().int().positive();
