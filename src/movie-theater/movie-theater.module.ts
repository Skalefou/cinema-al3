import { Module } from '@nestjs/common';
import { MovieTheaterController } from './presentation/controllers/movie-theater.controller';
import { AddMovieTheaterUseCase } from './application/use-cases/add-movie-theater.usecase';
import { PostgresMovieTheaterRepository } from './infrastructure/repositories/postgres-movie-theater.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieTheaterPostgresEntity } from './infrastructure/typeorm/movie-theater.postgres-entity';
import { UpdateMovieTheaterUseCase } from './application/use-cases/update-movie-theater.usecase';
import { DeleteMovieTheaterUsecase } from './application/use-cases/delete-movie-theater.usecase';
import { MOVIE_THEATER_REPOSITORY } from './domain/repositories/movie-theater.repository';


@Module({
    imports: [TypeOrmModule.forFeature([MovieTheaterPostgresEntity])],
    controllers: [MovieTheaterController],
    providers: [
        {
            provide: MOVIE_THEATER_REPOSITORY,
            useClass: PostgresMovieTheaterRepository,
        },
        AddMovieTheaterUseCase,
        UpdateMovieTheaterUseCase,
        DeleteMovieTheaterUsecase,
    ],
    exports: [MOVIE_THEATER_REPOSITORY],
})
export class MovieTheaterModule {}