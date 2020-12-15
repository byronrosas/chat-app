import { IEncrypter } from './../abstractions/IEncrypter';
import { ITokenService } from './../abstractions/ITokenService';
import { IUserRepository } from './../abstractions/IUser.repository';
import { User } from 'domain/models/User';
interface InputRegister{
    username:string;
    password:string;
}
export class RegisterCU{

    constructor(private readonly _encrypter:IEncrypter,private readonly _jwt:ITokenService, private readonly _userRep:IUserRepository){}    

    async exec(inputReg:InputRegister,res:any):Promise<any>{
        try {
            let user:User | null = await this._userRep.findByUsername(inputReg.username);        
            if(user || user != null) throw new Error("Username taked");        
            const pass = this._encrypter.encrypt(inputReg.password);
            let userNew:User = {...inputReg,password:pass,createAt:new Date()}            
            let persistResult: User = await this._userRep.persist(userNew);
            const token = this._jwt.create({userId:persistResult._id});
            res.json({token,  userId:persistResult._id, username:userNew.username});            
            
        }catch(err){
            console.log("err=>",err);
            res.status(500).send('Something broke!')
        }
 
    }
}