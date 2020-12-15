import bcrypt from 'bcrypt';
import { IEncrypter } from 'domain/abstractions/IEncrypter';

export class BcryptEncryption implements IEncrypter{
    private _saltRounds:number;
    constructor(saltRounds:number=10){
        this._saltRounds = saltRounds;
    }   

    encrypt(text:string):any{
        //return text hashed
        return  bcrypt.hashSync(text.toString(), this._saltRounds);
    }

    compare(text:string,hash:string):any{
        //return true if text = text hashed        
        return bcrypt.compareSync(text.toString(), hash.toString());
    }
}