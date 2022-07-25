import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true })
    );
    await app.listen(3000, 'localhost');
}

bootstrap();
