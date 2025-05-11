import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { AddMovieDTO } from 'src/movie/presentation/dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieMapper } from '../mappers/movie.mapper';
import { GetAllMovieUseCase } from '../../application/use-cases/get-all-movie.usecase';
import { Roles } from '../../../auth/decorators/roles.decorator';

@Controller('movie')
export class MovieController {
    constructor(
        private readonly addMovieUseCase: AddMovieUseCase,
        private readonly getAllMovieUseCase: GetAllMovieUseCase,
    ) {}

    @Post()
    @Roles('ADMIN')
    async addMovie(@Body() movieDTO: AddMovieDTO): Promise<Movie> {
        return this.addMovieUseCase.execute(MovieMapper.fromAddMovieDtoToDomain(movieDTO));
    }

    @Get("all")
    @Roles("USER")
    async getAllMovies(): Promise<Movie[]> {
        return this.getAllMovieUseCase.execute();
    }

    @Put(":id")
    @Roles("ADMIN")
    async updateMovie(
        @Param('id') id: string,
        @Body() movieDTO: AddMovieDTO
    ): Promise<Movie> {
        const movie = new Movie(movieDTO.title, movieDTO.director, movieDTO.releaseDate, movieDTO.duration, id);
        return this.addMovieUseCase.execute(movie);
    }
}
