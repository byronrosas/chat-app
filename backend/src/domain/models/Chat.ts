import { CollectionEnum } from './../enums/Collection.enum';
import { BaseEntity } from './BaseEntity';
import { prop, Ref } from "@typegoose/typegoose";
import { User } from './User';
import { IdType } from 'domain/customType/IdType';
export class Chat extends BaseEntity{
    @prop({required:true})
    message:string;
    @prop({ref:CollectionEnum.USER})
    to:Ref<User,IdType>;
}