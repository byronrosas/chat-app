import { BaseEntity } from './BaseEntity';
import { prop } from "@typegoose/typegoose";
export class User extends BaseEntity{
    @prop({required:true,unique:true})
    username:string;
    @prop({required:true })
    password:string;
}