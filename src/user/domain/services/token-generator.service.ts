import { TokenPayload } from '../models/token-payload.model';

export const TOKEN_GENERATOR = "TOKEN_GENERATOR";

export interface TokenGeneratorService {
    generateAccessToken(payload: TokenPayload): Promise<string>;
    generateRefreshToken(payload: TokenPayload): Promise<string>;
}