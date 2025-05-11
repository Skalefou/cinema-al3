import { UserPostgresEntity } from './user.postgres-entity';
import { User } from '../../domain/entities/user.entity';

export class UserPostgresMapper {
    static toDomain(user: UserPostgresEntity): User {
        return new User(
            user.email,
            user.password,
            user.roles,
            user.id,
        )
    }

    static toPostgresEntity(domain: User): UserPostgresEntity {
        const entity = new UserPostgresEntity();
        entity.id = domain.id;
        entity.email = domain.email;
        entity.password = domain.password;
        entity.roles = domain.roles;
        return entity;
    }
}