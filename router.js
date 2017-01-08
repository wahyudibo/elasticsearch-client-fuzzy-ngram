const router = require('koa-router')();

router.get('/', function *(next) {
  this.body = {status: 'success'};
});

router.post

module.exports = router;