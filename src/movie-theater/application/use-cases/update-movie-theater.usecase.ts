import { Inject, Injectable } from '@nestjs/common';
import { MOVIE_THEATER_REPOSITORY, MovieTheaterRepository } from '../../domain/repositories/movie-theater.repository';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';

@Injectable()
export class UpdateMovieTheaterUseCase {
    public constructor(
        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository,
    ) {}


    async execute(movieTheater: MovieTheater): Promise<MovieTheater> {
        return this.movieTheaterRepository.create(movieTheater);
    }
}