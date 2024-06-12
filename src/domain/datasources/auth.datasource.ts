import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from '../dtos/auth/register-user.auth.dto';


export abstract class AuthDataSource{

    //abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    
    abstract register(registerUserDto:RegisterUserDto): Promise<UserEntity>;
}