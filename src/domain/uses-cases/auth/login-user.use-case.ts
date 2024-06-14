import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.auth.dto";
import { RegisterUserDto } from "../../dtos/auth/register-user.auth.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from '../../repositories/auth.repository';

interface UserToken{
    token: string;
    user: {
        id: string,
        name: string,
        email: string
    }
}


interface LoginUserCase{
    execute(registerUserDto:LoginUserDto):Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


export class LoginUser implements LoginUserCase{

    constructor(
        private readonly authRepository: AuthRepository, 
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}


    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);
        const {id,name,email} = user;
        const token = await this.signToken({ id }, '2h');
        if(!token) throw CustomError.internalServerError('Error generating token');

        return {
            token,
            user: {
                id,
                name,
                email
            }
        }
    }

}