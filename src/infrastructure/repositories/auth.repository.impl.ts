import { RegisterUserDto, UserEntity } from '../../domain';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthDataSource } from '../../domain/datasources/auth.datasource';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.auth.dto';


export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDataSource: AuthDataSource,
    ){}
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }
    getUserById(id: string): Promise<UserEntity> {
        return this.authDataSource.getUserById(id);
    }
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }

}