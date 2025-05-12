import { UserPostgresEntity } from '../../../user/infrastructure/typeorm/user.postgres-entity';
import { User } from '../../../user/domain/entities/user.entity';
import { MovieTheaterPostgresEntity } from './movie-theater.postgres-entity';
import { MovieTheater } from '../../domain/entities/movie.theater.entity';


export class MovieTheaterPostgresMapper {
    static toDomain(movieT: MovieTheaterPostgresEntity): MovieTheater {
        return new MovieTheater(
            movieT.name,
            movieT.description,
            movieT.images,
            movieT.capacity,
            movieT.disabled_access,
            movieT.id,
        );
    }

    static toPostgresEntity(domain: MovieTheater): MovieTheaterPostgresEntity {
        const entity = new MovieTheaterPostgresEntity();
        entity.id = domain.id;
        entity.name = domain.name;
        entity.description = domain.description;
        entity.images = domain.images;
        entity.capacity = domain.capacity;
        entity.disabled_access = domain.disabledAccess;
        return entity;
    }


}

/*
@Entity('movie_theater')
export class MovieTheaterPostgresEntity {
    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'text', array: true, default: [] })
    images: string[];

    @Column({ type: 'smallint' })
    capacity: number;

    @Column({ type: 'boolean', default: false })
    disabled_access: boolean;
}
 */