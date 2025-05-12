import { MovieScreening } from '../entities/movie-screening.entity';

export const MOVIE_SCREENING_REPOSITORY = 'MOVIE_SCREENING_REPOSITORY';

export interface MovieScreeningRepository {
    create(movieScreening: MovieScreening): Promise<MovieScreening>;
}