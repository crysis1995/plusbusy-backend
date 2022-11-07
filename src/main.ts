import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import swaggerHelper from './common/swagger.helper/swagger.helper';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.enableCors({ origin: 'http://localhost:3000' });

    app.setGlobalPrefix('api');
    swaggerHelper(app);
    await app.listen(5000, 'localhost');
}

bootstrap();
