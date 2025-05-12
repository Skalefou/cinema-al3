import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('Documentation interactive de l’API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Pipes et guards globaux
  app.useGlobalPipes(new ValidationPipe());
  const jwtAuthGuard = app.get(JwtAuthGuard);
  const rolesGuard = app.get(RolesGuard);
  app.useGlobalGuards(jwtAuthGuard, rolesGuard);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();