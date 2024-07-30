import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // se adminte DTO
      forbidNonWhitelisted: true, // error si envia otra informacion
      transform: true, //transformar los datos siempre que pueda
    }),
  );
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_SERVER') || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/graphql`);
}
bootstrap();
