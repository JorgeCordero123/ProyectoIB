import { Validators } from "../../../config";


export class LoginUserDto{

    constructor(
        public email: string,
        public password:string
    ) { }
    
    public static login(email:string, password:string):[string?,LoginUserDto?] {
        if (!email) return ['Missing email'];
        if (!Validators.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 6) return ['Password is too short'];
        return [
            undefined,
            new LoginUserDto(email, password)
        ]
    }
}