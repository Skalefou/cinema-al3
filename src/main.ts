import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
      const jwtAuthGuard = app.get(JwtAuthGuard);  // ✅ fonctionne maintenant
      const rolesGuard = app.get(RolesGuard);

  app.useGlobalGuards(jwtAuthGuard, rolesGuard);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
