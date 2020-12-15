import { IEncrypter } from './../abstractions/IEncrypter';
import { ITokenService } from './../abstractions/ITokenService';
import { IUserRepository } from './../abstractions/IUser.repository';
import { exec } from "child_process"
import { User } from 'domain/models/User';
interface InputLogin{
    username:string;
    password:string;
}
export class LoginCU{

    constructor(private readonly _encrypter:IEncrypter,private readonly _jwt:ITokenService, private readonly _userRep:IUserRepository){}    

    async exec(inputLogin:InputLogin,res:any):Promise<any>{
        let user:User | null = await this._userRep.findByUsername(inputLogin.username);
        if(!user && user == null) throw new Error("Error - username dont found");;        
        //verify password
        console.log(inputLogin, user);
        if(!this._encrypter.compare(inputLogin.password,user.password)) throw new Error("password incorrect");
        const token = this._jwt.create({userId:user._id});
        res.json({token, userId:user._id,username:user.username});
    }
}