import { CreateMovieTheaterDTO } from '../dtos/create-movie-theater.dto';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';

export class MovieTheaterPresentationMapper {
    static createMovieTheaterDTOToDomain(createMovieTheaterDTO: CreateMovieTheaterDTO): MovieTheater {
        return new MovieTheater(
            createMovieTheaterDTO.name,
            createMovieTheaterDTO.description,
            createMovieTheaterDTO.images,
            createMovieTheaterDTO.capacity,
            createMovieTheaterDTO.disabledAccess,
            createMovieTheaterDTO.maintenance,
        );
    }
}