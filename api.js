const router = require('koa-router')();
const elasticsearch = require('./elasticsearch');

router.prefix('/api');

router.get('/search/:search', function *(next) {
  const query = decodeURIComponent(this.params.search);

  const result = yield elasticsearch.search({
    index: 'bank',
    body: {
      size: 10,
      query: {
        multi_match: {
          query,
          fields: ['firstname', 'lastname'],
          fuzziness: 1,
        }
      }
    }
  })

  this.body = { result };
});

module.exports = router;