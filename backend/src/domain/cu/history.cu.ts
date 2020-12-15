import { Chat } from './../models/Chat';

import { IChatRepository } from 'domain/abstractions/IChat.repository';
interface InputHistory{
    creatorId:string;
    to:string;
}
export class HistoryCU{

    constructor(private readonly _chatRep:IChatRepository){}    

    async exec(inputHistory:InputHistory,res:any):Promise<void>{
        console.log(inputHistory);
        try{
            let chat:Chat[] | null = await this._chatRep.listByCreatorAndTo({creatorId:inputHistory.creatorId,to:inputHistory.to});
            res.json(chat);
        }catch(err){
            console.log("err=>",err);
            res.status(500).send('Something broke!')
        }     
    }
}