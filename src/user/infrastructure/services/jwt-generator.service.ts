import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGeneratorService } from '../../domain/services/token-generator.service';
import { TokenPayload } from 'src/user/domain/models/token-payload.model';

@Injectable()
export class JwtGeneratorService implements TokenGeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: TokenPayload): Promise<string> {
      const pl = {
          userId: payload.userId,
          email: payload.email,
          roles: payload.roles,
      };
      return this.jwtService.signAsync(pl, {
          expiresIn: '15m',
          secret: process.env.JWT_SECRET,
      });
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
      const pl = {
          userId: payload.userId,
          email: payload.email,
          roles: payload.roles,
      };
      return this.jwtService.signAsync(pl, {
        expiresIn: '30d',
        secret: process.env.JWT_SECRET,
    });
  }
}