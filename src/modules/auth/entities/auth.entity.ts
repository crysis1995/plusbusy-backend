import { z } from "nestjs-zod/z";

export const CredentialsPayload = z.object({
    UserEmail:z.string(),
    UserId:z.number().int()
})

export type CredentialsPayloadType = z.infer<typeof CredentialsPayload>