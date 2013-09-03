var 
    connect = require('connect'),
    connectRoute = require('connect-route'),
    conf = require('./../conf')
;

var app = connect()

    .use(connect.bodyParser())
    //.use(function(req, res){
    //  console.log(req.body);
    //  res.setHeader('Content-Type', 'application/json')
    //  res.end(JSON.stringify({ status: 'success' }, null, 2));
    //})
    .use(connectRoute(function(router) {
    
        router.get('/api/transmission', function (req, res, next) {
            console.log(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'success' }, null, 2));
        });
        
        router.post('/api/dashboards', function (req, res, next) {
            console.log(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              "name"        : "Account Management",
              "userId"      : "4fd1f55b7e9b8705a1000053",
              "_id"         : "4fd2037a152714faa1000003",
              "widgets"     : [],
              "css"         : "",
              "screenWidth" : "fixed",
              "updatedAt"   : "2012-06-08T13:51:54.972Z",
              "createdAt"   : "2012-06-08T13:51:54.972Z"
            }, null, 2));
        });
    
    }))
    .listen(conf.mock.port)
;