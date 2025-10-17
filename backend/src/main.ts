import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { TransformInterceptor } from './shared/interceptors/renderer.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',');
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      console.log('Request from origin:', origin);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error('CORS blocked origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

console.log(`Local server started on port`, process.env.PORT ?? 3000);
bootstrap();
