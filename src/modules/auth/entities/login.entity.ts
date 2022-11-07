import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
    @ApiProperty({ type: 'string' })
    readonly username: string;
    @ApiProperty({ type: 'string' })
    readonly password: string;
}

// export const LoginPayload = z.object({
//
// });
// export type LoginPayloadType = z.infer<typeof LoginPayload>;
