import { IUserRepository } from './../abstractions/IUser.repository';
import { exec } from "child_process"
import { User } from "domain/models/User";

export class ListUsersCU{

    constructor(private readonly _userRep:IUserRepository){}    

    async exec(res:any){
        let users:User[] = await this._userRep.list();
        res.json(users);
    }
}