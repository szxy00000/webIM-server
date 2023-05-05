import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import { createServer } from "http";
import { Server } from "socket.io";
import mongo from "koa-mongo";
import routers from './src/router';
import cors from '@koa/cors';

const app = new Koa();

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

app.use(mongo({
    uri: 'mongodb+srv://Cluster29796:hJxYm4nA4lpzaRR7@cluster29796.xnopgm4.mongodb.net/?retryWrites=true&w=majority'
}));
app.use(cors({
    origin: '*'
}));
app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.io = io;
    await next();
})
routers.forEach((router: any) => {
    app.use(router.routes()).use(router.allowedMethods());
})

httpServer.listen(7777);