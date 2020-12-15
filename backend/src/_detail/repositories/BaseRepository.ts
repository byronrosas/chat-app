import { BaseEntity } from './../../domain/models/BaseEntity';
import { IBaseRepository } from 'domain/abstractions/IBase.repository';
import { IdType } from 'domain/customType/IdType';

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T>{
    protected model:any;    
    constructor(model:any){
        this.model = model;        
    }
        

    async persist(entity: T): Promise<T> {
        let docSaved =  (await this.model.create(entity)).save(); 
        return docSaved;
    }

    async findById(id: string | IdType): Promise<T | null> {
        const doc = await this.model.findById(id);
        return doc;
    }


    async list(): Promise<T[]> {        
        const docs = await this.model.find();
        return docs;
    }
        

}