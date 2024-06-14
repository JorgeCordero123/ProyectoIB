import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from '../dtos/auth/register-user.auth.dto';
import { LoginUserDto } from "../dtos/auth/login-user.auth.dto";


export abstract class AuthRepository{

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
    
    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
    abstract getUserById(id: string): Promise<UserEntity>;

}