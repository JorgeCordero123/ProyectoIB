import { JwtAdapter } from "../../../config";
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


interface RegisterUserCase{
    execute(registerUserDto:RegisterUserDto):Promise<UserToken>
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


export class RegisterUser implements RegisterUserCase{

    constructor(
        private readonly authRepository: AuthRepository, 
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ){}


    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto);
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