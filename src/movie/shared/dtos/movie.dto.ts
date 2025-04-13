import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class MovieDTO {
    @IsNotEmpty({ message: 'Le champ "name" est obligatoire' })
    @IsString({ message: 'name doit être une chaîne de caractères' })
    @MinLength(3, {
        message: 'Le champ "name" doit contenir au moins 3 caractères',
    })
    name: string;

    @IsNotEmpty({ message: 'Le champ "director" est obligatoire' })
    @IsString({ message: 'director doit être une chaîne de caractères' })
    @MinLength(3, {
        message: 'Le champ "director" doit contenir au moins 3 caractères',
    })
    director: string;

    @IsNotEmpty({ message: 'Le champ "release_date" est obligatoire' })
    release_date: Date;

    @IsNotEmpty({ message: 'Le champ "duration" est obligatoire' })
    @IsString({ message: 'duration doit être une chaîne de caractères' })
    duration: string;
}
