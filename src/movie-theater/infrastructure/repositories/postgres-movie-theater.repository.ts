import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieTheaterPostgresEntity } from '../typeorm/movie-theater.postgres-entity';
import { MovieTheaterRepository } from '../../domain/repositories/movie-theater.repository';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';
import { MovieTheaterPostgresMapper } from '../typeorm/movie-theater.postgres-mapper';

export class PostgresMovieTheaterRepository implements MovieTheaterRepository {
    constructor(
        @InjectRepository(MovieTheaterPostgresEntity)
        private readonly movieRepository: Repository<MovieTheaterPostgresEntity>,
    ) {}

    async update(movieTheater: MovieTheater): Promise<MovieTheater> {
        const entity = MovieTheaterPostgresMapper.toPostgresEntity(movieTheater);
        const saved = await this.movieRepository.save(entity);
        return MovieTheaterPostgresMapper.toDomain(saved);
    }

    async create(movieTheater: MovieTheater): Promise<MovieTheater> {
        const movieTheaterEntity =
            MovieTheaterPostgresMapper.toPostgresEntity(movieTheater);
        const saved = await this.movieRepository.save(movieTheaterEntity);
        return MovieTheaterPostgresMapper.toDomain(saved);
    }
}