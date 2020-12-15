export interface ITokenService{
    create(content:any):any;
    verify(token:string):any;
}