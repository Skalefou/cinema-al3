import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from '../dtos/register-user.dto';
import { RegisterUserUsecase } from '../../application/use-cases/register-user.usecase';
import { ResponseRegisterUserDTO } from '../dtos/response-register-user.dto';
import { UserPresentationMapper } from '../mappers/user.presentation.mapper';

@Controller("user")
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUsecase,
    ) {}

    @Post("register")
    async registerUser(@Body() userDTO: RegisterUserDTO): Promise<ResponseRegisterUserDTO> {
        const user = await this.registerUserUseCase.execute(UserPresentationMapper.registerUserDtoToDomain(userDTO));
        return UserPresentationMapper.toResponseRegister(user);
    }
}