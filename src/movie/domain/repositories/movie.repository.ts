import { Movie } from '../entities/movie.entity';

export const MOVIE_REPOSITORY = 'MOVIE_REPOSITORY';

export interface MovieRepository {
    add(movie: Movie): Promise<Movie>;
    update(movie: Movie): Promise<Movie>;
    getAll(): Promise<Movie[]>;
    deleteById(id: string): Promise<void>;
    findById(id: string): Promise<Movie | null>;
}
