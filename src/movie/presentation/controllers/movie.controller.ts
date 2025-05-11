import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { AddMovieDTO } from 'src/movie/presentation/dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieMapper } from '../mappers/movie.mapper';
import { GetAllMovieUseCase } from '../../application/use-cases/get-all-movie.usecase';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';

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
}
