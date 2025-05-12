import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @PrimaryGeneratedColumn('uuid')
    id?: string;
}