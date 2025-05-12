import { Inject, Injectable } from '@nestjs/common';
import { MovieScreening } from '../../domain/entities/movie-screening.entity';
import {
    MOVIE_SCREENING_REPOSITORY,
    MovieScreeningRepository,
} from '../../domain/repositories/movie-screening.repository';
import { MOVIE_REPOSITORY, MovieRepository } from '../../../movie/domain/repositories/movie.repository';
import {
    MOVIE_THEATER_REPOSITORY,
    MovieTheaterRepository,
} from '../../../movie-theater/domain/repositories/movie-theater.repository';

@Injectable()
export class CreateScreeningUseCase {
    constructor(
        @Inject(MOVIE_SCREENING_REPOSITORY)
        private readonly movieScreeningRepository: MovieScreeningRepository,

        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository,

        @Inject(MOVIE_THEATER_REPOSITORY)
        private readonly movieTheaterRepository: MovieTheaterRepository,
    ) {}

    async execute(movieId: string, movieTheaterId: string, startScreening: Date): Promise<void> {
        const movie = await this.movieRepository.findById(movieId);
        if (!movie) {
            throw new Error(`Movie ${movieId} not found`);
        }

        const movieTheater = await this.movieTheaterRepository.findById(movieTheaterId);
        if (!movieTheater) {
            throw new Error(`Movie theater ${movieTheaterId} not found`);
        }
/*
        //const durationMs = (movie.duration.hours ?? 0) * 60 * 60 * 1000 + (movie.duration.minutes ?? 0) * 60 * 1000;


        const duration = movie.duration;
        const endScreening = new Date(startScreening.getTime() + duration * 60000);*/

        //return this.movieScreeningRepository.create()
    }
}