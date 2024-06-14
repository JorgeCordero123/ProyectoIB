import { NextFunction, request, response } from 'express';
import { JwtAdapter } from '../../config';
import { JsonWebTokenError } from 'jsonwebtoken';
import { userModel } from '../../data/mongodb';
import { AuthRepository } from '../../domain';
import { AuthDataSourceImpl, AuthRepositoryImpl } from '../../infrastructure';



export class AuthMiddleware{


    public static validateJWT = async(req = request, res = response, next: NextFunction) =>{
        
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provided' });
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token'})
        const token = authorization.split(' ').at(1)||'';
        
        try {
            req.body.token = token;
            const payload = await JwtAdapter.validateToken<{id:string}>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const authDataSource = new AuthDataSourceImpl();
            const authRepository = new AuthRepositoryImpl(authDataSource);
            const user = await authRepository.getUserById(payload.id);
           
            req.body.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error_msg: 'Internal server error'})

        }
    }
}