const Router = require('@koa/router');
const router = new Router;

router.get('/chat', (ctx, next) => {
    console.log(213123)
    ctx.body = 123;
})

module.exports = router;