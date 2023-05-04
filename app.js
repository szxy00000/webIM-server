const Koa = require("koa");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongo = require("koa-mongo");
const routers = require('./src/router');

const app = new Koa();

routers.forEach(router => {
  app
    .use(router.routes())
    .use(router.allowedMethods());
})

// app.use(mongo({
//     uri: 'mongodb+srv://Cluster29796:aOUbCPqRXILpAY1i@cluster29796.xnopgm4.mongodb.net/?retryWrites=true&w=majority'
// }));

// app.use(async (ctx, next) => {
//     console.log(ctx, 123123)
//     ctx.db === ctx.mongo.db('test')
//     ctx.body = await ctx.db.collection('chat').find().toArray();
// })

const httpServer = createServer(app.callback());
// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//     },
//  });

// io.on("connection", (socket) => {
//   // ...
// });

httpServer.listen(3000);