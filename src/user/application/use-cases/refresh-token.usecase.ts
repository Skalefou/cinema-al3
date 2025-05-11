import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { PASSWORD_HASHER, PasswordHasherService } from '../../domain/services/password-hasher.service';
import { TOKEN_GENERATOR, TokenGeneratorService } from '../../domain/services/token-generator.service';import { TokenPayload } from '../../domain/models/token-payload.model';

@Injectable()
export class RefreshTokenUsecase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,

        @Inject(PASSWORD_HASHER)
        private readonly passwordHasher: PasswordHasherService,

        @Inject(TOKEN_GENERATOR)
        private readonly tokenGeneratorService: TokenGeneratorService,
    ) {}

    async execute(refreshToken: string): Promise<{ newAccessToken: string, newRefreshToken: string }> {
        const payload = await this.tokenGeneratorService.verifyToken(refreshToken);
        if (!payload || !payload.userId) {
            throw new Error('Token invalide');
        }

        const user = await this.userRepository.findByEmail(payload.email);
        if (!user || !user.id) {
            throw new Error('Utilisateur non trouvé');
        }

        const newAccessToken =
            await this.tokenGeneratorService.generateAccessToken(payload);
        const newRefreshToken =
            await this.tokenGeneratorService.generateRefreshToken(payload);
        return {newAccessToken, newRefreshToken};
    }
}