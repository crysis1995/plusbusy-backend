import { z } from 'nestjs-zod/z';

export const VEHICLE_SHORT_NAME_MAX_LENGTH = 20;
export const VEHICLE_SHORT_NAME_MIN_LENGTH = 2;

export const ShortNameSchema = z.string().min(VEHICLE_SHORT_NAME_MIN_LENGTH).max(VEHICLE_SHORT_NAME_MAX_LENGTH);
