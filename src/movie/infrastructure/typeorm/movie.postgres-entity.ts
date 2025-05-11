import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class MoviePostgresEntity {
    @Column({ type: 'varchar', length: 64 })
    title: string;

    @Column({ type: 'varchar', length: 64 })
    director: string;

    @Column({ type: 'date' })
    release_date: Date;

    @Column({ type: 'interval' })
    duration: string;

    @PrimaryGeneratedColumn('uuid')
    id?: string;
}