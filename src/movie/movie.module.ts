import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './presentation/controllers/movie.controller';
import { PostgresMovieRepository } from './infrastructure/repositories/postgres-movie.repository';
import { AddMovieUseCase } from './application/use-cases/add-movie.usecase';
import { MoviePostgresEntity } from './infrastructure/typeorm/movie.postgres-entity';

@Module({
    imports: [TypeOrmModule.forFeature([MoviePostgresEntity])],
    controllers: [MovieController],
    providers: [
        {
            provide: 'MOVIE_REPOSITORY',
            useClass: PostgresMovieRepository,
        },
        AddMovieUseCase,
    ]
})
export class MovieModule {}
