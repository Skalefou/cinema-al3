import { MovieScreeningPostgresEntity } from './movie-screening.postgres-entity';
import { MovieScreening } from '../../domain/entities/movie-screening.entity';
import { MoviePostgresMapper } from '../../../movie/infrastructure/typeorm/movie.postgres-mapper';
import {
    MovieTheaterPostgresMapper
} from '../../../movie-theater/infrastructure/typeorm/movie-theater.postgres-mapper';

export class MovieScreeningPostgresMapper {
    static toDomain(entity: MovieScreeningPostgresEntity): MovieScreening {
        return new MovieScreening(
            MoviePostgresMapper.toDomain(entity.movie),
            MovieTheaterPostgresMapper.toDomain(entity.movie_theater),
            entity.start_screening,
            entity.end_screening,
            entity.available_seats,
            entity.id,
        );
    }

    static toPostgresEntity(domain: MovieScreening): MovieScreeningPostgresEntity {
        const entity = new MovieScreeningPostgresEntity();
        entity.id = domain.id;
        entity.movie = MoviePostgresMapper.toPostgresEntity(domain.movie);
        entity.movie_theater = MovieTheaterPostgresMapper.toPostgresEntity(domain.movie_theater);
        entity.start_screening = domain.start_screening;
        entity.end_screening = domain.end_screening;
        entity.available_seats = domain.available_seats;
        return entity;
    }
}