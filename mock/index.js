var 
    connect = require('connect'), 
    conf = require('./../conf')
;

var app = connect()
  .use(connect.bodyParser())
  .use(function(req, res){
    console.log(req.body.data);
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'success' }, null, 2));
  })
 .listen(conf.mock.port)
;
