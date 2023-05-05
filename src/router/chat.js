const Router = require('@koa/router');
const router = new Router;
const { chatHistory } = require('../controller/chat');

router.post('/chat', async (ctx, next) => {
    const msg = ctx.request.body;
    ctx.io.emit('sync', msg);
    ctx.mongo.db('test').collection('chat').insertOne(msg);
    ctx.body = 'success';
})

router.get('/chatHistory', async (ctx, next) => {
    ctx.body = await chatHistory(ctx);
})

module.exports = router;