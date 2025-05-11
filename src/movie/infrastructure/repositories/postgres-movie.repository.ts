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

    async update(movie: Movie): Promise<Movie> {
      const existing = await this.movieRepository.findOne({ where: { id: movie.id } });

      if (!existing) {
        throw new Error(`Film ${movie.id} introuvable`);
      }

      const updatedEntity = MovieMapper.toPostgresEntity(movie);
      const saved = await this.movieRepository.save(updatedEntity);

      return MovieMapper.toDomain(saved);
    }

    async add(movie: Movie): Promise<Movie> {
        const moviePostgres = MovieMapper.toPostgresEntity(movie);
        const saved = await this.movieRepository.save(moviePostgres);
        return MovieMapper.toDomain(saved);
    }

    async getAll(): Promise<Movie[]> {
        const movies = await this.movieRepository.find();
        return movies.map((movie) => MovieMapper.toDomain(movie));
    }

    async deleteById(id: string): Promise<void> {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new Error(`Film ${id} introuvable`);
        }
        await this.movieRepository.delete(id);
    }
}
