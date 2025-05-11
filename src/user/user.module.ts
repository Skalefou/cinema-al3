import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUsecase } from './application/use-cases/register-user.usecase';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher.service';
import { UserPostgresRepository } from './infrastructure/repositories/postgres-user.repository';
import { UserPostgresEntity } from './infrastructure/typeorm/user.postgres-entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserPostgresEntity])],
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
        RegisterUserUsecase,
    ]
})
export class UserModule {}