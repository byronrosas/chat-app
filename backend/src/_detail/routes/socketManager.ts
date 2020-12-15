import { SaveMessageCU } from './../../domain/cu/saveMessage.cu';
import { SocketEnum } from './../enums/socket.enum';


import * as io from 'socket.io';
import { IUserRepository } from './../../domain/abstractions/IUser.repository';
import { IChatRepository } from './../../domain/abstractions/IChat.repository';
import { UserRepository } from './../../_detail/repositories/UserRepository';
import { ChatRepository } from './../../_detail/repositories/ChatRepository';

import mongoose from 'mongoose';

let userRepository:IUserRepository = new UserRepository();
let chatRepository:IChatRepository = new ChatRepository();

let saveMessageCU = new SaveMessageCU(userRepository,chatRepository);


interface UrlEvent{
    url:string,
    // cb:Function
}
interface CodeName{
    code:string;
}
export class SockerManager{
    private io:io.Server;
    constructor(io:io.Server){
        this.io = io;
        this.eventos();
    }

    eventos(){ 
        var sockets:any = {};       
        this.io.on(SocketEnum.CONNECT,(socket)=>{
            socket.on("code",(code:CodeName)=>{
                // socket.id = code;
                sockets[code.code.toString()] = socket;
                console.log("Client connected:",socket.id);
                // console.log("SOCL",sockets);
            });  
                                  
            socket.on(SocketEnum.MESSAGE,({message, userId ,id}:any)=>{
                console.log("MESSAGE",message);
                //UC
                saveMessageCU.exec({message:message,to:mongoose.Types.ObjectId(id),userId:mongoose.Types.ObjectId(userId.userId)});
                // console.log("ID",id);
                // socket.join(id);
                sockets[id].emit(SocketEnum.MESSAGE,{userId,id:socket.id,message});
                // socket.broadcast.to(id).emit(SocketEnum.MESSAGE,{userId,id:socket.id,message});        
            });                                                
        });
    }
}