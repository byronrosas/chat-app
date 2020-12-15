import { RegisterCU } from './../../domain/cu/register.cu';
import { BcryptEncryption } from './../service/BcryptEncrypter';
import { LoginCU } from './../../domain/cu/login.cu';
import { JwtokenService } from './../service/jwtoken.service';
import { Router } from 'express';
import * as dotenv from 'dotenv';
import { IUserRepository } from './../../domain/abstractions/IUser.repository';
import { UserRepository } from './../../_detail/repositories/UserRepository';
//env variables
dotenv.config()
const SECRET = process.env.SECRET ? process.env.SECRET : "";
const router = Router();
let tokenService = new JwtokenService(SECRET);
let encrypt = new BcryptEncryption(10);
let userRepository:IUserRepository = new UserRepository();
let uclogin = new LoginCU(encrypt,tokenService,userRepository);
let ucreg = new RegisterCU(encrypt,tokenService,userRepository);

router.post('/login',(req,res)=> uclogin.exec({username:req.body.username,password:req.body.password},res));
router.post('/register',(req,res)=>{ 
    console.log(req.body);
    ucreg.exec({username:req.body.username,password:req.body.password},res);
});


module.exports = router;