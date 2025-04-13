import { Body, Controller, Post } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { MovieDTO } from 'src/movie/shared/dtos/movie.dto';
import { Movie } from '../../domain/entities/movie.entity';

@Controller('movie')
export class MovieController {
    constructor(private readonly addMovieUseCase: AddMovieUseCase) {}

    @Post()
    async addMovie(@Body() movieDTO: MovieDTO): Promise<Movie> {
        return this.addMovieUseCase.execute(movieDTO);
    }
}
