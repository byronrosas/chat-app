import { SockerManager } from './_detail/routes/socketManager';
import {SocketServer} from './_detail/socketServer';

let server = new SocketServer();
new SockerManager(server.getIO());
const app = server.getApp();
export { app };