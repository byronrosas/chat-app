import { ITokenService } from './../../domain/abstractions/ITokenService';
import * as jwt from "jsonwebtoken";
export class JwtokenService implements ITokenService{    
    constructor(private readonly secret:string){}
    //create token, return new token signed
    create(content:any) {           
        const newToken = jwt.sign(content,this.secret, {
            expiresIn: "100h"
        });
        return newToken;
    }

    //convert token to content
    verify(token:string){        
        let content = jwt.verify(token, this.secret);                
        return content;
    }

}