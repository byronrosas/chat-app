export interface IEncrypter{
    encrypt(text:any):any;
    compare(text:any,hash:string):any;
}