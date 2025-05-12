import { MovieScreeningRepository } from '../../domain/repositories/movie-screening.repository';
import { MovieScreening } from '../../domain/entities/movie-screening.entity';
import { MovieScreeningPostgresMapper } from '../typeorm/movie-screening.postgres-mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieScreeningPostgresEntity } from '../typeorm/movie-screening.postgres-entity';

export class PostgresMovieScreeningRepository implements MovieScreeningRepository {
        constructor(
        @InjectRepository(MovieScreeningPostgresEntity)
        private readonly movieScreeningRepository: Repository<MovieScreeningPostgresEntity>,
    ) {}

    async create(movieScreening: MovieScreening): Promise<MovieScreening> {
        const entity = MovieScreeningPostgresMapper.toPostgresEntity(movieScreening);
        const saved = await this.movieScreeningRepository.save(entity);
        return MovieScreeningPostgresMapper.toDomain(saved);
    }

}