import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PASSWORD_HASHER, PasswordHasherService } from '../../domain/services/password-hasher.service';
import { TOKEN_GENERATOR, TokenGeneratorService } from '../../domain/services/token-generator.service';
import { TokenPayload } from '../../domain/models/token-payload.model';

@Injectable()
export class RegisterUserUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,

        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasherService,

        @Inject(TOKEN_GENERATOR)
        private readonly tokenGeneratorService: TokenGeneratorService,
    ) {}

    async execute(user: User): Promise<{
          registeredUser: User;
          accessToken: string;
          refreshToken: string;
    }> {
        user.password = await this.passwordHasher.hash(user.password);

        const registeredUser = await this.userRepository.register(user);

        if (!registeredUser.id) {
            throw new Error('L\'ID de l\'utilisateur enregistré est indéfini.');
        }

        const payLoad = new TokenPayload(registeredUser.id, registeredUser.email, registeredUser.roles);
        const accessToken = await this.tokenGeneratorService.generateAccessToken(payLoad);
        const refreshToken = await this.tokenGeneratorService.generateRefreshToken(payLoad);
        return {registeredUser, accessToken, refreshToken};
    }
}