import { IChatRepository } from './../../domain/abstractions/IChat.repository';
import { Chat } from './../../domain/models/Chat';
import { getModelForClass } from '@typegoose/typegoose';
import { BaseRepository } from './BaseRepository';
import mongoose from 'mongoose';
export class ChatRepository extends BaseRepository<Chat> implements IChatRepository{
    // public model=getModelForClass(Chat);
    constructor(){        
        super(getModelForClass(Chat));     
    }

    async listByCreatorAndTo(arg0: { creatorId: string; to: string }): Promise<Chat[] | null> {
        let docs = await this.model.find({to:mongoose.Types.ObjectId(arg0.to),idCreateBy:mongoose.Types.ObjectId(arg0.creatorId)});
        return docs;
    }

    
}