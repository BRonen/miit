import Koa from 'koa';

const app = new Koa();

const a: number = 2;

console.log(a)

app.use((ctx) => {
    ctx.body = 'hello world w';
});

app.listen(9000, () => {
    console.log('listening at http://0.0.0.0:9000/')
})