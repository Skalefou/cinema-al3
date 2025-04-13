import { MovieRepository } from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PostgresMovieRepository implements MovieRepository {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async add(movie: Movie): Promise<Movie> {
        return this.movieRepository.save(movie);
    }
}
