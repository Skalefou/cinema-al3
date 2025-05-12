import { Module } from '@nestjs/common';
import { MovieController } from '../movie/presentation/controllers/movie.controller';
import { CreateScreeningUseCase } from './application/use-cases/createScreening.usecase';
import { PostgresMovieRepository } from '../movie/infrastructure/repositories/postgres-movie.repository';
import {
    PostgresMovieTheaterRepository
} from '../movie-theater/infrastructure/repositories/postgres-movie-theater.repository';
import { PostgresMovieScreeningRepository } from './infrastructure/repositories/postgres-movie-screening.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieScreeningPostgresEntity } from './infrastructure/typeorm/movie-screening.postgres-entity';
import { MovieModule } from '../movie/movie.module';
import { MovieTheaterModule } from 'src/movie-theater/movie-theater.module';

@Module({
  imports: [
    MovieModule,
    MovieTheaterModule,
    TypeOrmModule.forFeature([MovieScreeningPostgresEntity])
  ],
  controllers: [],
  providers: [
    {
      provide: 'MOVIE_SCREENING_REPOSITORY',
      useClass: PostgresMovieScreeningRepository,
    },
    CreateScreeningUseCase
  ],
})
export class MovieScreeningModule {}
