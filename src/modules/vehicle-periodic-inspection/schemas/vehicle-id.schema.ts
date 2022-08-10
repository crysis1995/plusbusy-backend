import { z } from 'nestjs-zod/z';

export const VehicleIdSchema = z.number().int().min(0);
