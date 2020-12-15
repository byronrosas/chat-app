import mongoose, { Mongoose, Connection } from 'mongoose';
export class MongooseProvider{

    static _db:Connection;

    //private static instance for mongoprovider
    private static instance:MongooseProvider;
    
    //private constructor prevent the new external instance
    private constructor(){}

    //get access to instance for mongoprovider
    //return this instance
    public static getInstance():MongooseProvider{
        //if instance dont was created, to create new
        if(!this.instance){
            this.instance = new MongooseProvider();             
        }
        //return this instance
        return this.instance;
    } 

    
    //init
    public async init(uri:string){
        await mongoose.connect(uri, {useNewUrlParser: true});
        MongooseProvider._db = mongoose.connection;  
                                     
        MongooseProvider._db.on('connected', ()=>{
            console.log("Mongoose connected on:",uri);
        });
        if(MongooseProvider._db!==null)
        {
            MongooseProvider._db.on('error', console.error.bind(console, 'connection error:'));
        }        
    }    
}