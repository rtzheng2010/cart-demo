const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new Router();
app.use(cors());
app.use(bodyParser())

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'abc123',
  database        : 'koa'
});

/*pool.query('SELECT * FROM goods', function (error, results, fields) {
  if (error) throw error;
  console.log('The result is: \n', results);
  //console.log('The field is: \n', fields);
});*/
let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
async function selectAllData( ) {
    let sql = 'SELECT * FROM goods'
    let dataList = await query( sql )
    return dataList
  }

async function updateData( postData) {
    let count=postData.count;
    let clength=count.length+1;
    for(let i=1;i<count.length;i++)  {
      let sql = `update goods set count=${count[i]} where id=${i}`;
      await query( sql );
    }    
    console.log(count);
    return null;
  } 
async function getData() {
    let dataList = await selectAllData()
    console.log( dataList );
    let successFlag = true;
    if (successFlag) {
      // 正常返回数据
      // 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
      return Promise.resolve(dataList);
    } else {
      // 失败返回数据
      // 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
      return Promise.reject('Something went wrong, errorCode:111');
    }
}


  
router.get('/goods', async (ctx, next) => {
   try {
    ctx.response.type = 'json';
    let sqlResult = await getData();
    ctx.response.body = JSON.stringify(sqlResult);
  } catch (error) {
    // 如果await里面传回了promise.reject 就会在这里被catch到
    console.error(error);
  }
});
/*router.post('/test', async (ctx, next) => {
   try {
    ctx.response.type = 'json';
    let sqlResult = await getData();
    ctx.response.body = JSON.stringify(sqlResult);
  } catch (error) {
    // 如果await里面传回了promise.reject 就会在这里被catch到
    console.error(error);
  }
});*/
router.post('/test', async (ctx, next) => {
   try {
    let postData = ctx.request.body;
    await updateData(postData);
    ctx.response.type = 'json';
    ctx.response.body= ctx.request.body ;
    console.log(postData);
  } catch(error) {
    console.error(error);
  }
    //console.log(postData);
});
//getData();

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3001);