import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MOVIE_REPOSITORY, MovieRepository } from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';

@Injectable()
export class PutMovieUseCase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository,
    ) {}

    async execute(movie: Movie): Promise<Movie> {
        const existingMovie = await this.movieRepository.update(movie);
        if (!existingMovie) {
            throw new NotFoundException(`Film ${movie.id} introuvable`);
        }
        return existingMovie;
    }
}