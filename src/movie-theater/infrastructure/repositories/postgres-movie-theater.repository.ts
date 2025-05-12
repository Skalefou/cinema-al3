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

    async findById(id: string): Promise<MovieTheater | null> {
        const entity = await this.movieRepository.findOne({ where: { id } });

        if (!entity) {
            throw new Error(`Salle de cinéma ${id} introuvable`);
        }

        return MovieTheaterPostgresMapper.toDomain(entity);
    }

    async delete(id: string): Promise<void> {
        await this.movieRepository.delete(id);
    }

    async update(movieTheater: MovieTheater): Promise<MovieTheater> {
        const entity =
            MovieTheaterPostgresMapper.toPostgresEntity(movieTheater);
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