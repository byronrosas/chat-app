const jwt = require('jsonwebtoken');
import * as dotenv from 'dotenv';
//env variables
dotenv.config()

const SECRET = process.env.SECRET;
function isAuth(req:any, res:any, next:any){
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token,SECRET );
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
export default isAuth;