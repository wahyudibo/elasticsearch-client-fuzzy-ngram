const router = require('koa-router')();
const Elasticsearch = require('elasticsearch');

const es = new Elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

router.prefix('/es');

router.get('/', function *(next) {
  this.body = {status: 'success'};
});

router.post

module.exports = router;