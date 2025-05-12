import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { MoviePostgresEntity } from '../../../movie/infrastructure/typeorm/movie.postgres-entity';
import {
    MovieTheaterPostgresEntity
} from '../../../movie-theater/infrastructure/typeorm/movie-theater.postgres-entity';

@Entity('movie_screening')
export class MovieScreeningPostgresEntity {
    @ManyToOne(() => MoviePostgresEntity, { eager: false, nullable: false })
    @JoinColumn({ name: 'movie_id' })
    movie: MoviePostgresEntity;

    @ManyToOne(() => MovieTheaterPostgresEntity, { eager: false, nullable: false })
    @JoinColumn({ name: 'movie_theater_id' })
    movie_theater: MovieTheaterPostgresEntity;

    @Column({ type: 'timestamp' })
    start_screening: Date;

    @Column({ type: 'timestamp' })
    end_screening: Date;

    @Column({ type: 'int' })
    available_seats: number;

    @PrimaryGeneratedColumn('uuid')
    id?: string;
}
