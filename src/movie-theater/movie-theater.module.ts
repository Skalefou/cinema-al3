import { Module } from '@nestjs/common';
import { MovieTheaterController } from './presentation/controllers/movie-theater.controller';
import { AddMovieTheaterUseCase } from './application/use-cases/add-movie-theater.usecase';


@Module({
    imports: [],
    controllers: [MovieTheaterController],
    providers: [
        AddMovieTheaterUseCase,
    ]
})
export class MovieTheaterModule {}