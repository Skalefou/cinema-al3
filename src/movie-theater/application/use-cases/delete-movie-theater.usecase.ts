import { Inject, Injectable } from '@nestjs/common';
import { MOVIE_THEATER_REPOSITORY, MovieTheaterRepository } from '../../domain/repositories/movie-theater.repository';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';

@Injectable()
export class DeleteMovieTheaterUsecase {
    public constructor(
        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository,
    ) {}


    async execute(id: string): Promise<void> {
        await this.movieTheaterRepository.delete(id);
    }
}