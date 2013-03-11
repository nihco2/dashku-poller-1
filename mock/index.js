var 
    connect = require('connect'), 
    conf = require('./../conf')
;

var app = connect()
  .use(function(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'success' }, null, 2));
  })
 .listen(conf.dashku.port)
;