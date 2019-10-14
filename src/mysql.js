var mysql      = require('mysql');
const cors = require('@koa/cors');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
app.use(cors());
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'abc123',
  database : 'koa'
});

connection.connect();

connection.query('SELECT * FROM goods', function (error, results, fields) {
  if (error) throw error;
  console.log('The result is:\n ', results);
  //console.log(results);
  //console.log(fields);
});

connection.end();