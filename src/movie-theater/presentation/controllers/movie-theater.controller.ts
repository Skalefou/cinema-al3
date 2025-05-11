import { Controller, Post } from '@nestjs/common';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { AddMovieTheaterUseCase } from '../../application/use-cases/add-movie-theater.usecase';

@Controller('movie-theater')
export class MovieTheaterController {
    constructor(
        private readonly addMovieTheaterUseCase: AddMovieTheaterUseCase,
    ) {}

    @Post("create")
    @Roles("ADMIN")
    async createMovieTheater() {

    }
}

/*import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddMovieUseCase } from '../../application/use-cases/add-movie.usecase';
import { AddMovieDTO } from 'src/movie/presentation/dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';
import { MovieMapper } from '../mappers/movie.mapper';
import { GetAllMovieUseCase } from '../../application/use-cases/get-all-movie.usecase';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { DeleteMovieUseCase } from '../../application/use-cases/delete-movie.usecase';
import { PutMovieUseCase } from '../../application/use-cases/update-movie.usecase';

@Controller('movie')
export class MovieController {
    constructor(
        private readonly addMovieUseCase: AddMovieUseCase,
        private readonly getAllMovieUseCase: GetAllMovieUseCase,
        private readonly putMovieUseCase: PutMovieUseCase,
        private readonly deleteMovieUseCase: DeleteMovieUseCase,
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
        return this.putMovieUseCase.execute(movie);
    }

    @Delete(":id")
    @Roles("ADMIN")
    async deleteMovie(@Param('id') id: string): Promise<void> {
        await this.deleteMovieUseCase.execute(id);
    }
}


 */