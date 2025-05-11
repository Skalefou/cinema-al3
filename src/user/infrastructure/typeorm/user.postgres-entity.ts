import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviePostgresEntity } from '../../../movie/infrastructure/typeorm/movie.postgres-entity';

@Entity('users')
export class UserPostgresEntity {
    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'varchar', length: 64 })
    password: string;

    @Column({ type: 'text', array: true, default: ['USER'] })
    roles: string[];

    @PrimaryGeneratedColumn('uuid')
    id?: string;
}