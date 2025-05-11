import { AddMovieDTO } from '../dtos/add-movie.dto';
import { Movie } from '../../domain/entities/movie.entity';

export class MovieMapper {
    static fromAddMovieDtoToDomain(dto: AddMovieDTO): Movie {
        return new Movie(
            dto.title,
            dto.director,
            dto.releaseDate,
            dto.duration,
        );
    }
}