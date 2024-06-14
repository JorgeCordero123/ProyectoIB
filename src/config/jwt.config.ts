import { envs } from './envs.config';
import jwt from 'jsonwebtoken';

export class JwtAdapter {


    public static generateToken<T>(payload: Object, duration: string = '2h'):Promise<T|null>{
        
        
        return new Promise((resolve, reject) => {
            jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (err,token) => {
                if (err) return resolve(null);
                resolve(token! as T);
            })
        });
    }

    public static validateToken<T>(token:string):Promise<T|null> {
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            })
        }); 

    }
}