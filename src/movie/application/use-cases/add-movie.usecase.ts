import { Inject, Injectable } from '@nestjs/common';
import {
    MOVIE_REPOSITORY,
    MovieRepository,
} from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';

@Injectable()
export class AddMovieUseCase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository,
    ) {}

    async execute(movie: Movie): Promise<Movie> {
        return this.movieRepository.add(movie);
    }
}
