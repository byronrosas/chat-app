import { Chat } from './../models/Chat';
import { IBaseRepository } from './IBase.repository';
export interface IChatRepository extends IBaseRepository<Chat>{
    listByCreatorAndTo(arg0: { creatorId: string; to: string; }): Promise<Chat[] | null>;    
}