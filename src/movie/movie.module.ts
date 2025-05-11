import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './presentation/controllers/movie.controller';
import { PostgresMovieRepository } from './infrastructure/repositories/postgres-movie.repository';
import { AddMovieUseCase } from './application/use-cases/add-movie.usecase';
import { MoviePostgresEntity } from './infrastructure/typeorm/movie.postgres-entity';
import { GetAllMovieUseCase } from './application/use-cases/get-all-movie.usecase';
import { PutMovieUseCase } from './application/use-cases/update-movie.usecase';

@Module({
    imports: [TypeOrmModule.forFeature([MoviePostgresEntity])],
    controllers: [MovieController],
    providers: [
        {
            provide: 'MOVIE_REPOSITORY',
            useClass: PostgresMovieRepository,
        },
        AddMovieUseCase,
        GetAllMovieUseCase,
        PutMovieUseCase,
    ]
})
export class MovieModule {}
