import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // <-- à importer
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { RegisterUserUsecase } from './application/use-cases/register-user.usecase';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher.service';
import { UserPostgresRepository } from './infrastructure/repositories/postgres-user.repository';
import { UserPostgresEntity } from './infrastructure/typeorm/user.postgres-entity';
import { JwtGeneratorService } from './infrastructure/services/token-generator.service';
import { LoginUserUsecase } from './application/use-cases/login-user.usecase';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserPostgresEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret_key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: 'USER_REPOSITORY',
            useClass: UserPostgresRepository,
        },
        {
            provide: 'PASSWORD_HASHER',
            useClass: BcryptPasswordHasher,
        },
        {
            provide: 'TOKEN_GENERATOR',
            useClass: JwtGeneratorService,
        },
        RegisterUserUsecase,
        LoginUserUsecase
    ],
})
export class UserModule {}
