const router = require('koa-router')();

router.get('/', function *(next) {
  this.body = {status: 'success'};
});

module.exports = router;