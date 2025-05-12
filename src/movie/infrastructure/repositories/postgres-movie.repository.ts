import { MovieRepository } from '../../domain/repositories/movie.repository';
import { Movie } from '../../domain/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviePostgresEntity } from '../typeorm/movie.postgres-entity';
import { MoviePostgresMapper } from '../typeorm/movie.postgres-mapper';

export class PostgresMovieRepository implements MovieRepository {
    constructor(
        @InjectRepository(MoviePostgresEntity)
        private readonly movieRepository: Repository<MoviePostgresEntity>,
    ) {}

    async findById(id: string): Promise<Movie | null> {
        const entity = await this.movieRepository.findOne({ where: { id } });

        if (!entity) {
            throw new Error(`Film ${id} introuvable`);
        }

        return MoviePostgresMapper.toDomain(entity);
    }

    async update(movie: Movie): Promise<Movie> {
        const existing = await this.movieRepository.findOne({
            where: { id: movie.id },
        });

        if (!existing) {
            throw new Error(`Film ${movie.id} introuvable`);
        }

        const updatedEntity = MoviePostgresMapper.toPostgresEntity(movie);
        const saved = await this.movieRepository.save(updatedEntity);

        return MoviePostgresMapper.toDomain(saved);
    }

    async add(movie: Movie): Promise<Movie> {
        const moviePostgres = MoviePostgresMapper.toPostgresEntity(movie);
        const saved = await this.movieRepository.save(moviePostgres);
        return MoviePostgresMapper.toDomain(saved);
    }

    async getAll(): Promise<Movie[]> {
        const movies = await this.movieRepository.find();
        const r = MoviePostgresMapper.toDomain(movies[0]);
        console.log(r.duration);
        return movies.map((movie) => MoviePostgresMapper.toDomain(movie));
    }

    async deleteById(id: string): Promise<void> {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new Error(`Film ${id} introuvable`);
        }
        await this.movieRepository.delete(id);
    }
}
