const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
app.use(cors());
router.get('/goods', (ctx, next) => {
    //ctx.body = 'Hello World!';
    ctx.response.type = 'json';
    ctx.response.body =[
        {
            "name": "樱花折扇",
            "weight": "0.06",
            "price": 39
        },
        {
            "name": "Nike跑步鞋",
            "weight": "0.62",
            "price": 368
        },
        {
            "name": "Xbox One X",
            "weight": "4.84",
            "price": 3685
        }
    ];
});

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3001);
console.log("Hello World");
