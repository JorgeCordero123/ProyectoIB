import { Request, Response } from "express"
import { AuthRepository, CustomError, LoginUser, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { userModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.auth.dto";



export class AuthController{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log('Internal server Error')
        return res.status(500).json({error, sys:'Internal server error'})
        
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const registerUser = new RegisterUser(this.authRepository, JwtAdapter.generateToken);
        
        registerUser.execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error=> this.handleError(error, res));

    }
    
    loginUser = (req: Request, res: Response) => {
        const {email, password}= req.body;
        const [error, loginUserDto] = LoginUserDto.login(email, password);
        if (error) return res.status(400).json({error});
        const loginUser = new LoginUser(this.authRepository, JwtAdapter.generateToken);
        loginUser.execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))
    }

    getUsers = (req:Request, res: Response) => {
        userModel.find()
            .then(users => res.json({user:req.body.user}))
            .catch(error => this.handleError(error, res))
    }


}