import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './domain/entities/movie.entity';
import { MovieController } from './presentation/controllers/movie.controller';
import { PostgresMovieRepository } from './infrastructure/repositories/postgres-movie.repository';
import { AddMovieUseCase } from './application/use-cases/add-movie.usecase';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
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
