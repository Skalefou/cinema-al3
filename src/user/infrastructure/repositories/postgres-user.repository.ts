import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPostgresEntity } from '../typeorm/user.postgres-entity';
import { UserPostgresMapper } from '../typeorm/user.postgres-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPostgresRepository implements UserRepository {
    constructor(
        @InjectRepository(UserPostgresEntity)
        private readonly userRepository: Repository<UserPostgresEntity>,
    ) {}

    async register(user: User): Promise<User> {
        const userPostgres = UserPostgresMapper.toPostgresEntity(user);
        const saved = await this.userRepository.save(userPostgres);
        return UserPostgresMapper.toDomain(saved);
    }
}