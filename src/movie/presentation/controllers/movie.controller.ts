import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { AddMovieDTO } from 'src/movie/presentation/dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieMapper } from '../mappers/movie.mapper';
import { GetAllMovieUseCase } from '../../application/use-cases/get-all-movie.usecase';

@Controller('movie')
export class MovieController {
    constructor(
        private readonly addMovieUseCase: AddMovieUseCase,
        private readonly getAllMovieUseCase: GetAllMovieUseCase,
    ) {}

    @Post()
    async addMovie(@Body() movieDTO: AddMovieDTO): Promise<Movie> {
        return this.addMovieUseCase.execute(MovieMapper.fromAddMovieDtoToDomain(movieDTO));
    }

    @Get("all")
    async getAllMovies(): Promise<Movie[]> {
        return this.getAllMovieUseCase.execute();
    }
}
