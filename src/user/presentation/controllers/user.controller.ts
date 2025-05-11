import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from '../dtos/register-user.dto';
import { RegisterUserUsecase } from '../../application/use-cases/register-user.usecase';
import { ResponseRegisterUserDTO } from '../dtos/response-register-user.dto';
import { UserPresentationMapper } from '../mappers/user.presentation.mapper';
import { LoginUserUsecase } from '../../application/use-cases/login-user.usecase';
import { ResponseLoginUserDTO } from '../dtos/response-login-user.dto';
import { Public } from '../../../auth/decorators/public.decorator';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { ResponseRefreshDTO } from '../dtos/response-refresh.dto';
import { RefreshTokenUsecase } from '../../application/use-cases/refresh-token.usecase';

@Controller("user")
export class UserController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUsecase,
        private readonly loginUserUseCase: LoginUserUsecase,
        private readonly refreshTokenUseCase: RefreshTokenUsecase
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

    @Public()
    @Post("refresh")
    async refreshToken(@Body() dto: RefreshTokenDTO): Promise<ResponseRefreshDTO> {
        const {newRefreshToken, newAccessToken} = await this.refreshTokenUseCase.execute(dto.refreshToken);
        return new ResponseRefreshDTO(newAccessToken, newRefreshToken);
    }
}