const MongoClient = require('mongodb').MongoClient;
export class MongoDBProvider {
    public static instance?:MongoDBProvider = undefined;
    public connection:any;
    constructor(db:any) {
        this.connection = db;
    }

  
    public static getInstance():MongoDBProvider{
        if (!this.instance) {
            throw new Error("setup mongo singleton connection please...")
        }

        return this.instance;
    }
    
    public static async setup(uriDB:string){        
        const client = new MongoClient(uriDB, { useNewUrlParser: true });
        var dbClient = await client.connect();
        const db = await dbClient.db("chatapp");        
        MongoDBProvider.instance = new MongoDBProvider(db)
    }
}
  