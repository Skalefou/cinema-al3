import { IsDate, IsNotEmpty, IsString, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieScreeningDTO {
    @IsNotEmpty({ message: 'Le champ "movieId" est obligatoire.' })
    @IsString({ message: 'Le champ "movieId" doit être une chaîne de caractères.' })
    public movieId: string;

    @IsNotEmpty({ message: 'Le champ "movieTheaterId" est obligatoire.' })
    @IsString({ message: 'Le champ "movieTheaterId" doit être une chaîne de caractères.' })
    public movieTheaterId: string;

    @IsNotEmpty({ message: 'Le champ "startScreening" est obligatoire.' })
    @Type(() => Date)
    @IsDate({ message: 'Le champ "startScreening" doit être une date valide.' })
    @MinDate(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
     }, {
    message: 'La date de début doit être au moins dans un mois.',
    })
    public startScreening: Date;
}