import { Inject, Injectable } from '@nestjs/common';
import {
    MOVIE_REPOSITORY,
    MovieRepository,
} from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieDTO } from '../../shared/dtos/movie.dto';

@Injectable()
export class AddMovieUseCase {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly movieRepository: MovieRepository,
    ) {}

    async execute(movie: MovieDTO): Promise<Movie> {
        const newMovie = new Movie();
        newMovie.name = movie.name;
        newMovie.release_date = movie.release_date;
        newMovie.director = movie.director;
        newMovie.duration = movie.duration;

        return this.movieRepository.add(newMovie);
    }
}
