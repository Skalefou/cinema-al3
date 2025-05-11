import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from '../dtos/register-user.dto';
import { RegisterUserUsecase } from '../../application/use-cases/register-user.usecase';
import { ResponseRegisterUserDTO } from '../dtos/response-register-user.dto';
import { UserPresentationMapper } from '../mappers/user.presentation.mapper';
import { LoginUserUsecase } from '../../application/use-cases/login-user.usecase';
import { ResponseLoginUserDTO } from '../dtos/response-login-user.dto';
import { Public } from '../../../auth/decorators/public.decorator';

@Controller("user")
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUsecase,
        private readonly loginUserUseCase: LoginUserUsecase,
    ) {}

    @Public()
    @Post("register")
    async registerUser(@Body() userDTO: RegisterUserDTO): Promise<ResponseRegisterUserDTO> {
        const {registeredUser, accessToken, refreshToken} = await this.registerUserUseCase.execute(UserPresentationMapper.registerUserDtoToDomain(userDTO));
        return UserPresentationMapper.toResponseRegister(registeredUser, accessToken, refreshToken);
    }

    @Public()
    @Post("login")
    async loginUser(@Body() userDTO: LoginUserDTO): Promise<ResponseLoginUserDTO> {
        const {registeredUser, accessToken, refreshToken} = await this.loginUserUseCase.execute(UserPresentationMapper.registerUserDtoToDomain(userDTO));
        return UserPresentationMapper.toResponseLogin(registeredUser, accessToken, refreshToken);
    }
}