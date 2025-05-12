import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { AddMovieTheaterUseCase } from '../../application/use-cases/add-movie-theater.usecase';
import { CreateMovieTheaterDTO } from '../dtos/create-movie-theater.dto';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';
import { MovieTheaterPresentationMapper } from '../mappers/movie-theater.presentation.mapper';
import { UpdateMovieTheaterUseCase } from '../../application/use-cases/update-movie-theater.usecase';
import { DeleteMovieTheaterUsecase } from '../../application/use-cases/delete-movie-theater.usecase';

@Controller('movie-theater')
export class MovieTheaterController {
    constructor(
        private readonly addMovieTheaterUseCase: AddMovieTheaterUseCase,
        private readonly updateMovieTheaterUseCase: UpdateMovieTheaterUseCase,
        private readonly deleteMovieTheaterUseCase: DeleteMovieTheaterUsecase,
    ) {}

    @Post("create")
    @Roles("ADMIN")
    async createMovieTheater(@Body () movieTheaterDTO: CreateMovieTheaterDTO): Promise<MovieTheater> {
        return this.addMovieTheaterUseCase.execute(MovieTheaterPresentationMapper.createMovieTheaterDTOToDomain(movieTheaterDTO));
    }

    @Put(":id")
    @Roles("ADMIN")
    async updateMovieTheater(
        @Param('id') id: string,
        @Body () movieTheaterDTO: CreateMovieTheaterDTO
    ): Promise<MovieTheater> {
        const movieTheater = new MovieTheater(
            movieTheaterDTO.name,
            movieTheaterDTO.description,
            movieTheaterDTO.images,
            movieTheaterDTO.capacity,
            movieTheaterDTO.disabledAccess,
            movieTheaterDTO.maintenance,
            id,
        );
        return this.updateMovieTheaterUseCase.execute(movieTheater);
    }

    @Delete(":id")
    @Roles("ADMIN")
    async deleteMovieTheater(@Param('id') id: string): Promise<void> {
        await this.deleteMovieTheaterUseCase.execute(id);
    }
}