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

const output = (result) => {
  let num_message = `Found ${result.length} person(s) by the name '${search}':`;
  console.log(num_message);
  for (let row in result){
    let first_name = result[row].first_name;
    let last_name = result[row].last_name;
    let birthdate = result[row].birthdate.toISOString().slice(0,10);
    let message = `${first_name} ${last_name}, born ${birthdate}`;
    console.log(message);
  }
}


knex('famous_people').where('first_name', search[0]).orWhere('last_name', search[0])
.asCallback(function(err, result) {
  if (err) return console.error(err);
    console.log('Searching...');
    output(result);
    knex.destroy();
  });

