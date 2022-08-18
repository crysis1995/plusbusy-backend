import { z } from 'nestjs-zod/z';

export const NoteSchema = z.string().optional()