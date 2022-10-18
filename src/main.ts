import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
        .setTitle('Bus Transport')
        .setDescription('The API of bus transport management app.')
        .setVersion('1.0')
        .addTag('driver')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    await app.listen(5000, 'localhost');
}

bootstrap();
