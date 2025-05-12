import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateMovieTheaterDTO {
  @IsNotEmpty({ message: 'Le champ "name" est obligatoire' })
  @IsString({ message: 'Le champ "name" doit être une chaîne de caractères' })
  @MinLength(3, {
    message: 'Le champ "name" doit contenir au moins 3 caractères',
  })
  name: string;

  @IsNotEmpty({ message: 'Le champ "description" est obligatoire' })
  @IsString({ message: 'Le champ "description" doit être une chaîne de caractères' })
  @MinLength(10, {
    message: 'Le champ "description" doit contenir au moins 10 caractères',
  })
  description: string;

  @IsArray({ message: 'Le champ "images" doit être un tableau' })
  @ArrayNotEmpty({ message: 'Le champ "images" ne peut pas être vide' })
  @IsString({ each: true, message: 'Chaque élément de "images" doit être une chaîne' })
  images: string[];

  @IsNotEmpty({ message: 'Le champ "capacity" est obligatoire' })
  @IsNumber({}, { message: 'Le champ "capacity" doit être un nombre' })
  capacity: number;

  @IsNotEmpty({ message: 'Le champ "disabledAccess" est obligatoire' })
  @IsBoolean({ message: 'Le champ "disabledAccess" doit être un booléen' })
  disabledAccess: boolean;
}