const pg = require("pg");
const settings = require("./settings"); // settings.json


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const search = process.argv.slice(2);

const output = (result) => {
  let num_message = `Found ${result.rows.length} person(s) by the name '${search}':`;
  console.log(num_message);
  for (let row in result.rows){
    let first_name = result.rows[row].first_name;
    let last_name = result.rows[row].last_name;
    let birthdate = result.rows[row].birthdate.toISOString().slice(0,10);
    let message = `${first_name} ${last_name}, born ${birthdate}`;
    console.log(message);
  }
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1", search, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...');
    output(result); //output: 1
    client.end();
  });
});
