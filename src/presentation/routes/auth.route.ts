import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class AuthRoutes{

    public static get routes(): Router{
        const router = Router();

        const authDataSource = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(authDataSource);
        const controller = new AuthController(authRepository);

        router.post('/login', controller.loginUser);
        router.post('/register',controller.registerUser);
        router.get('/', [AuthMiddleware.validateJWT],controller.getUsers);

        return router;
    }
}