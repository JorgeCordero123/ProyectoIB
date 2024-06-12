import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";


export class AuthRoutes{

    public static get routes(): Router{
        const router = Router();

        const authDataSource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(authDataSource);
        const controller = new AuthController(authRepository);

        router.post('/login', controller.loginUser);
        router.post('/register',controller.registerUser);

        return router;
    }
}