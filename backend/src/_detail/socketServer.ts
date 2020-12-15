var cors = require('cors');
import * as dotenv from 'dotenv';
import express from 'express';
import * as io from 'socket.io';
const bodyParser = require('body-parser');
import {createServer, Server} from 'http';
import { MongooseProvider } from './providers/mongo/MongooseProvider';

const userRoute = require('./routes/account.route');
const chatRoute = require('./routes/chat.route');


//env variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const URIDB = process.env.URIDB || "";



export class SocketServer{
    private io:io.Server;
    private app:express.Application;
    constructor(){
        //server
        this.app = express();
       
        //body
        this.app.use(bodyParser.json());
            
        let servidor:Server = createServer(this.app);

        
        this.app.use(cors({
            credentials:true,            
            origin:'*'
        })); 

        this.app.use('/user',userRoute);
        this.app.use('/chat',chatRoute);


        //socket
        this.io = new io.Server(servidor,{cors:{origin:"*"}});
        // io.cors({origin:"*"});

        this.conectionMongo();

        //iniciar servidor
        servidor.listen(PORT,()=>{
            console.log("Servidor iniciado en => %s",PORT);
        });
        
    }
    

    getIO(){
        return this.io;
    }

    async conectionMongo(){
        try{
            //init mongoose provider
            console.log(URIDB);
        await MongooseProvider.getInstance().init(URIDB);            
        } catch(err){
            console.log("err DB=>",err);
        }
    }

    getApp (): express.Application {
        return this.app;
    }
}