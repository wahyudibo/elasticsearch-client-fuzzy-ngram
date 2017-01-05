const app = require('koa')();
const router = require('./router');

app.use(router.routes())
app.use(router.allowedMethods());

const server = app.listen(3000, () => {
  console.log(`Server listening on port : ${server.address().port}`);
});