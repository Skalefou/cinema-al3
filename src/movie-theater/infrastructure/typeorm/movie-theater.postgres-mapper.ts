import { UserPostgresEntity } from '../../../user/infrastructure/typeorm/user.postgres-entity';
import { User } from '../../../user/domain/entities/user.entity';
import { MovieTheaterPostgresEntity } from './movie-theater.postgres-entity';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';


export class MovieTheaterPostgresMapper {
    static toDomain(movieT: MovieTheaterPostgresEntity): MovieTheater {
        return new MovieTheater(
            movieT.name,
            movieT.description,
            movieT.images,
            movieT.capacity,
            movieT.disabled_access,
            movieT.maintenance,
            movieT.id,
        );
    }

    static toPostgresEntity(domain: MovieTheater): MovieTheaterPostgresEntity {
        const entity = new MovieTheaterPostgresEntity();
        entity.id = domain.id;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.images = domain.images;
        entity.capacity = domain.capacity;
        entity.disabled_access = domain.disabledAccess;
        entity.maintenance = domain.maintenance;
        return entity;
    }


}