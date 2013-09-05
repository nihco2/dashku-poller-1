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
    
        router.post('/api/transmission', function (req, res, next) {
            console.log(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'success' }, null, 2));
        })
        
        router.post('/api/dashboards', function (req, res, next) {
            console.log('created dashboard :', req.body.name)
            //console.log('\n-------------------------------\n', req.body)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              "name"        : "Account Management",
              "userId"      : "4fd1f55b7e9b8705a1000053",
              "_id"         : "4fd2037a152714faa1000003",
              "widgets"     : [],
              "css"         : "",
              "screenWidth" : "fixed",
              "updatedAt"   : "2012-06-08T13:51:54.972Z",
              "createdAt"   : "2012-06-08T13:51:54.972Z"
            }, null, 2))
        })
        
        router.post('/api/dashboards/:dashboard_id/widgets', function(req, res, next){
            console.log('created widget :', req.body.name, 'on dash', req.params.dashboard_id)
            //console.log('\n-------------------------------\n',req.body )
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
                "userId"      : "4fd1f55b7e9b8705a1000053",
                "_id"         : "4fd328d98caaf987a7000045",
                "updatedAt"   : "2012-06-09T10:43:37.292Z",
                "createdAt"   : "2012-06-09T10:43:37.292Z",
                "height"      : 180,
                "width"       : 200,
                "json"        : "{\n  \"revenue\": \"346729.00\",\n  \"_id\": \"4fd328d98caaf987a7000045\"\n}",
                "scriptType"  : "javascript",
                "script"      : "var widget = this.widget;\n\nthis.on('load', function(data){\n  // Nothing to do\n});\n\nthis.on('transmission', function(data){\n  var salesNumber = widget.find('#salesNumber');\n  salesNumber.text('$'+data.revenue).hide().fadeIn();\n});",
                "scopedCSS"   : ".widget[data-id='4fd328d98caaf987a7000045'] #salesNumber {\n  font-weight: bold;\n  font-size: 24pt;\n}",
                "css"         : "#salesNumber {\n  font-weight: bold;\n  font-size: 24pt;\n}",
                "html"        : "<div id=\"salesNumber\"></div>",
                "name"        : "New Account Sales"
            }, null, 2))
        })
    
    }))
    .listen(conf.mock.port)
;