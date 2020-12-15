import { IdType } from './../customType/IdType';
import { IEncrypter } from './../abstractions/IEncrypter';
import { ITokenService } from './../abstractions/ITokenService';
import { IUserRepository } from './../abstractions/IUser.repository';
import { User } from 'domain/models/User';
import { Chat } from 'domain/models/Chat';
import { IChatRepository } from 'domain/abstractions/IChat.repository';
interface InputMessage{
    message:string,
    to:IdType,
    userId:IdType;
}
export class SaveMessageCU{

    constructor(private readonly _userRep:IUserRepository,private readonly _chatRep:IChatRepository){}    

    async exec(inputMsg:InputMessage):Promise<any>{
        let user:User | null = await this._userRep.findById(inputMsg.userId);        
        if(!user || user== null) throw new Error("User dont exists");                
        let msnNew:Chat = {...inputMsg,createAt:new Date()}
        let persistResult: Chat = await this._chatRep.persist(msnNew);        
        
    }
}