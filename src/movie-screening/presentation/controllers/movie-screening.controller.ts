import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { CreateMovieScreeningDTO } from '../dtos/create-movie-screening.dto';
import { CreateScreeningUseCase } from '../../application/use-cases/createScreening.usecase';

@Controller("movie-screening")
export class MovieScreeningController {
    constructor(
        private readonly createMovieScreeningUseCase: CreateScreeningUseCase,
    ) {
    }


    @Post("create")
    @Roles("ADMIN")
    async createScreening(
        @Body() dto: CreateMovieScreeningDTO
        ): Promise<void> {
        await this.createMovieScreeningUseCase.execute(dto.movieId, dto.movieTheaterId, dto.startScreening);
    }
}