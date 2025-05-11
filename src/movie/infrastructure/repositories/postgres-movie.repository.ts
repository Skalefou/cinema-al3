import { MovieRepository } from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviePostgresEntity } from '../typeorm/movie.postgres-entity';
import { MovieMapper } from '../typeorm/movie.mapper';

export class PostgresMovieRepository implements MovieRepository {
    constructor(
        @InjectRepository(MoviePostgresEntity)
        private readonly movieRepository: Repository<MoviePostgresEntity>,
    ) {}

    async add(movie: Movie): Promise<Movie> {
        const moviePostgres = MovieMapper.toPostgresEntity(movie);
        const saved = await this.movieRepository.save(moviePostgres);
        return MovieMapper.toDomain(saved);
    }
}
