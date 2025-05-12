import { Movie } from '../../../movie/domain/entities/movie.entity';
import { MovieTheater } from '../entities/movie.theater.entity';

export const MOVIE_THEATER_REPOSITORY = 'MOVIE_THEATER_REPOSITORY';

export interface MovieTheaterRepository {
    create(movieTheater: MovieTheater): Promise<MovieTheater>;
    update(movieTheater: MovieTheater): Promise<MovieTheater>;
}
