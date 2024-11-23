import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import "./webpush";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true });
  app.enableCors({origin:['https://pomowork-frontend.pages.dev']});
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('M700')
    .setDescription('The M700 API description')
    .setVersion('1.0')
    .addTag('start')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
