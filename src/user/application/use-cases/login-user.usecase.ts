import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { PASSWORD_HASHER, PasswordHasherService } from '../../domain/services/password-hasher.service';
import { TOKEN_GENERATOR, TokenGeneratorService } from '../../domain/services/token-generator.service';
import { TokenPayload } from '../../domain/models/token-payload.model';

@Injectable()
export class LoginUserUsecase {
        constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,

        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasherService,

        @Inject(TOKEN_GENERATOR)
        private readonly tokenGeneratorService: TokenGeneratorService,
    ) {}

    async execute(userDTO: User): Promise<{
          registeredUser: User;
          accessToken: string;
          refreshToken: string;
    }> {
        const user = await this.userRepository.findByEmail(userDTO.email);
        if (!user || !user.id) {
            throw new Error('Utilisateur non trouvé');
        }

        const isPasswordValid = await this.passwordHasher.compare(userDTO.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mot de passe invalide');
        }

        const payload = new TokenPayload(user.id, user.email, user.roles);
        const accessToken = await this.tokenGeneratorService.generateAccessToken(payload);
        const refreshToken = await this.tokenGeneratorService.generateRefreshToken(payload);

        return { registeredUser: user, accessToken, refreshToken };

    }
}