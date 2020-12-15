import { getModelForClass } from '@typegoose/typegoose';
import { User } from './../../domain/models/User';
import { IUserRepository } from './../../domain/abstractions/IUser.repository';
import { BaseRepository } from './BaseRepository';
export class UserRepository extends BaseRepository<User> implements IUserRepository{
    // public model=getModelForClass(User);
    constructor(){        
        super(getModelForClass(User));     
    }
    
    async findByUsername(username: string): Promise<User | null> {
        let doc = await this.model.findOne({username});
        return doc;
    }
    
}