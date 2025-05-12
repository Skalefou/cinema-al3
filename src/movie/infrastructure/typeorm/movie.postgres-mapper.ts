import { Movie } from '../../domain/entities/movie.entity';
import { MoviePostgresEntity } from './movie.postgres-entity';

export class MoviePostgresMapper {
    static toDomain(entity: MoviePostgresEntity): Movie {
        return new Movie(
            entity.title,
            entity.director,
            entity.release_date,
            entity.duration,
            entity.id
        );
    }

    static toPostgresEntity(domain: Movie): MoviePostgresEntity {
        const entity = new MoviePostgresEntity();
        entity.id = domain.id;
        entity.title = domain.title;
        entity.director = domain.director;
        entity.release_date = domain.releaseDate;
        entity.duration = domain.duration;
        return entity;
    }
}