import Router from '@koa/router';
import { chatHistory } from '../controller/chat';

const router = new Router();

router.post('/chat', async (ctx, next) => {
    const msg = ctx.request.body;
    ctx.io.emit('sync', msg);
    ctx.mongo.db('test').collection('chat').insertOne(msg as any);
    ctx.body = 'success';
})

router.get('/chatHistory', async (ctx, next) => {
    ctx.body = await chatHistory(ctx);
})

export default router;