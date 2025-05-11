import { Body, Controller, Post } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { AddMovieDTO } from 'src/movie/presentation/dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieMapper } from '../mappers/movie.mapper';

@Controller('movie')
export class MovieController {
    constructor(private readonly addMovieUseCase: AddMovieUseCase) {}

    @Post()
    async addMovie(@Body() movieDTO: AddMovieDTO): Promise<Movie> {
        return this.addMovieUseCase.execute(MovieMapper.fromAddMovieDtoToDomain(movieDTO));
    }
}
