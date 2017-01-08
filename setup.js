const co = require('co');
const chalk = require('chalk');
const elasticsearch = require('./elasticsearch');
const accounts = require('./accounts');

const index = 'bank';
const type = 'accounts';

co(function *_() {
  const indexExists = yield elasticsearch.indices.exists({ index: 'bank' });

  if (indexExists) {
    console.log(chalk.green(`√ Index found! deleting index...`));
    yield elasticsearch.indices.delete({ index: 'bank' });
  } 

  console.log(chalk.green(`√ Creating index...`))

  yield elasticsearch.indices.create({ index });

  console.log(chalk.green(`√ Index created!`))

  console.log(chalk.green(`√ Put some settings and analysis...`));

  yield elasticsearch.indices.close({ index });
  
  yield elasticsearch.indices.putSettings({
    index,
    body: {
      analysis: {
        analyzer: {
          autocomplete: {
            type: 'custom',
            tokenizer: 'autocomplete',
            filter: ['lowercase'],
            char_filter: ["html_strip"],
          },
          autocomplete_search: {
            tokenizer: 'lowercase',
          },
        },
        tokenizer: {
          autocomplete: {
            type: "edge_ngram",
            min_gram: 2,
            max_gram: 15,
            token_chars: ['letter', 'digit'],
          },
        }, 
      },
    }
  });

  yield elasticsearch.indices.putMapping({
    index,
    type,
    body: {
      accounts: {
        _all: {
          analyzer: 'autocomplete',
          search_analyzer: 'autocomplete_search',
        },
        properties: {
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          }
        }
      },
    },
  });

  yield elasticsearch.indices.open({ index });

  console.log(chalk.green(`√ Done! Inserting some data...`))

  yield elasticsearch.bulk({
    body: accounts,
  });
})
  .then(() => {
    console.log(chalk.green(`√ All done!`));
  })
  .catch((e) => {
    console.log(chalk.red(e.message));
  });