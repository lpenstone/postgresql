const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  },
  acquireConnectionTimeout: 10000
});

const search = process.argv.slice(2);

knex('famous_people').insert([{first_name: search[0], last_name: search[1], birthdate: '2017-01-01'}])
.asCallback(function(err, result) {
  if (err) return console.error(err);
    knex.select('*').from('famous_people')
      .asCallback(function(err, result) {
      if (err) return console.error(err);
        console.log(result[result.length - 1]);
        knex.destroy();
  });
});

