const app = require('koa')();

const api = require('./api');
const web = require('./web');

app.use(web.routes());
app.use(web.allowedMethods());
app.use(api.routes());
app.use(api.allowedMethods());

const server = app.listen(3000, () => {
  console.log(`Server listening on port : ${server.address().port}`);
});