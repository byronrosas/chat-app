import { HistoryCU } from './../../domain/cu/history.cu';
import { SaveMessageCU } from './../../domain/cu/saveMessage.cu';
import { Router } from 'express';
import isAuth from './../../_detail/middleware/isAuth';
import { ListUsersCU } from './../../domain/cu/listUsers.cu';
import { UserRepository } from './../../_detail/repositories/UserRepository';
import { IUserRepository } from './../../domain/abstractions/IUser.repository';
import { ChatRepository } from './../../_detail/repositories/ChatRepository';
import { IChatRepository } from './../../domain/abstractions/IChat.repository';
import mongoose from 'mongoose';
const router = Router();

let userRepository:IUserRepository = new UserRepository();
let chatRepository:IChatRepository = new ChatRepository();
let listUserUC = new  ListUsersCU(userRepository);
let historyMsn = new HistoryCU(chatRepository);
// router.post('/message',isAuth,(req,res)=>sendMessageUC.exec({message:req.body.message,to:mongoose.Types.ObjectId(req.body.to),userId:mongoose.Types.ObjectId(req.body.userId)},res));
router.post('/message',isAuth,(req,res)=>historyMsn.exec({creatorId:req.body.creatorId,to:req.body.to},res));
router.get('/contacts',isAuth,(req,res)=>listUserUC.exec(res));



module.exports = router;