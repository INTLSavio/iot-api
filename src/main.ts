import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Prova - Backend')
    .setDescription('Resolução da prova backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Enter your JWT token'
      },
      'JWT-Auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(Number(process.env.PORT));
}
bootstrap();
