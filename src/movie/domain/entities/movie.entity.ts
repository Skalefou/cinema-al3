import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'varchar', length: 64 })
    director: string;

    @Column({ type: 'date' })
    release_date: Date;

    @Column({ type: 'interval' })
    duration: string;
}
