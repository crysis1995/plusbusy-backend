import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { CredentialsPayload } from '../entities/auth.entity';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        const validation = CredentialsPayload.safeParse(value);
        if (validation.success) return validation.data;
        else throw new HttpException('asdasd', HttpStatus.BAD_REQUEST);
    }
}
