import { IdType } from './../customType/IdType';
import { Ref,prop } from '@typegoose/typegoose';
import { User } from './User';
import { CollectionEnum } from '../enums/Collection.enum';
export class BaseEntity{          
    _id?:IdType;
    
    @prop({required:true})
    createAt:Date;// date      
        
    @prop({ref:CollectionEnum.USER})
    idCreateBy?:Ref<User,IdType>;    
}