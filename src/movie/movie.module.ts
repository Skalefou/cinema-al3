import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './presentation/controllers/movie.controller';
import { PostgresMovieRepository } from './infrastructure/repositories/postgres-movie.repository';
import { AddMovieUseCase } from './application/use-cases/add-movie.usecase';
import { MoviePostgresEntity } from './infrastructure/typeorm/movie.postgres-entity';
import { GetAllMovieUseCase } from './application/use-cases/get-all-movie.usecase';
import { PutMovieUseCase } from './application/use-cases/update-movie.usecase';
import { DeleteMovieUseCase } from './application/use-cases/delete-movie.usecase';
import { MOVIE_REPOSITORY } from './domain/repositories/movie.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MoviePostgresEntity])],
    controllers: [MovieController],
    providers: [
        {
            provide: MOVIE_REPOSITORY,
            useClass: PostgresMovieRepository,
        },
        AddMovieUseCase,
        GetAllMovieUseCase,
        PutMovieUseCase,
        DeleteMovieUseCase
    ],
    exports: [MOVIE_REPOSITORY],
})
export class MovieModule {}
