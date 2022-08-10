import { z } from 'nestjs-zod/z';

export const ShortNameSchema = z.string().nonempty()