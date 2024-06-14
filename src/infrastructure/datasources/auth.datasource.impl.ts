import { BcryptAdapter } from "../../config";
import { userModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.auth.dto";
import { UserMapper } from "../mappers/user.mapper";


type HashFunction = (password:string) => string;
type CompareFunction = (password:string,hashed:string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const user = await userModel.findOne({ email });
            if (!user) throw CustomError.badRequest('User does not exist');
            const isMaching = this.comparePassword(password, user.password);
            if(!isMaching) throw CustomError.badRequest('Password is not valid');
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServerError();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name,email,password} = registerUserDto;
        try {

            const exists = await userModel.findOne({email})
            if (exists) throw CustomError.badRequest('User already exist');
            const user = new userModel({
                name,
                email, 
                password: this.hashPassword(password)
            });
            await user.save();

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);



        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

   

    async getUserById(id:string):Promise<UserEntity> {
        try {
            const user = await userModel.findById(id);
            if (!user) throw CustomError.notFound('User not found');

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }


}