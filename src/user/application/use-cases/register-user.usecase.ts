import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PASSWORD_HASHER, PasswordHasher } from '../../domain/services/password-hasher';

@Injectable()
export class RegisterUserUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,

        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasher,
    ) {}

    async execute(user: User): Promise<User> {
        user.password = await this.passwordHasher.hash(user.password);

        const registeredUser = this.userRepository.register(user);
        return registeredUser;
    }
}