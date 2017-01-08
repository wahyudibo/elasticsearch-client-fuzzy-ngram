const Elasticsearch = require('elasticsearch');

module.exports = Elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace',
});