import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
    @IsNotEmpty({ message: 'Le champ "email" est obligatoire' })
    @IsEmail({}, { message: 'Le champ "email" doit être une adresse email valide' })
    email: string;

    @IsNotEmpty({ message: 'Le champ "password" est obligatoire' })
    @IsString({ message: 'Le champ "password" doit être une chaîne de caractères' })
    @MinLength(6, {
        message: 'Le champ "password" doit contenir au moins 6 caractères',
    })
    password: string;
}
