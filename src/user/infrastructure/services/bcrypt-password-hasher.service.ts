import { PasswordHasherService } from '../../domain/services/password-hasher.service';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasherService {
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}