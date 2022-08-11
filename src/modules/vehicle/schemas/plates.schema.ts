import { z } from 'nestjs-zod/z';

export const PlatesSchema = z.string().nonempty();
