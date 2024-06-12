import { compare, compareSync, genSaltSync, hashSync } from 'bcryptjs';


export class BcryptAdapter{

    public static hash(password: string):string {
        const salt = genSaltSync(10);

        return hashSync(password, salt);
    }

    public static compare(password:string,hashed:string):boolean {
        return compareSync(password, hashed);
    }
}