import { User } from '../../domain/entities/user.entity';
import { RegisterUserDTO } from '../dtos/register-user.dto';
import { ResponseRegisterUserDTO } from '../dtos/response-register-user.dto';

export class UserPresentationMapper {
    static registerUserDtoToDomain(input: RegisterUserDTO): User {
        return new User(
            input.email,
            input.password,
            ['USER'],
        );
    }

    static toResponseRegister(user: User, accessToken: string, refreshToken: string): ResponseRegisterUserDTO {
        return new ResponseRegisterUserDTO(
            user.email,
            user.roles,
            accessToken,
            refreshToken,
            user.id,
        );
    }
}