import { MovieTheater } from '../../../movie-theater/domain/entities/movie.theater.entity';
import { Movie } from '../../../movie/domain/entities/movie.entity';

export class MovieScreening {
    constructor(
        public movie: Movie,
        public movie_theater: MovieTheater,
        public start_screening: Date,
        public end_screening: Date,
        public available_seats: number,
        public readonly id?: string,
    ) {}
}
