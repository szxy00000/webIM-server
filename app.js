const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongo = require("koa-mongo");
const routers = require('./src/router');
const cors = require('@koa/cors');

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
routers.forEach(router => {
    app.use(router.routes()).use(router.allowedMethods());
})

httpServer.listen(7777);