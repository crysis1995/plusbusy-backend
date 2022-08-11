import { z } from 'nestjs-zod/z';

export const VEHICLE_SEATS_MIN_COUNT = 2;
export const VEHICLE_SEATS_MAX_COUNT = 70;

export const SeatsCountSchema = z.number().int().min(VEHICLE_SEATS_MIN_COUNT).max(VEHICLE_SEATS_MAX_COUNT);
