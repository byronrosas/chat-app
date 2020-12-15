import { IdType } from 'domain/customType/IdType';
import { BaseEntity } from './../models/BaseEntity';

export abstract class IBaseRepository<T extends BaseEntity>{
    abstract persist(entity:T):Promise<T>;
    abstract list(): Promise<T[]>;        
    abstract findById(id:string | IdType):Promise<T | null>;;
}