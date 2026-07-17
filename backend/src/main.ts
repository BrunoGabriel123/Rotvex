import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe as CustomValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
    new TimeoutInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'Rotvex API')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION ||
        'Rotvex - SaaS de gerenciamento logístico',
    )
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api`,
  );
}
void bootstrap();
