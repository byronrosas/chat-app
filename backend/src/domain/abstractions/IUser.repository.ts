import { User } from 'domain/models/User';
import { IBaseRepository } from './IBase.repository';
export interface IUserRepository extends IBaseRepository<User>{
    findByUsername(username: string): Promise<User | null>;
    
}