
    var 
        conf        = require('./../conf'),
        request     = require("request"),
        Redmine     = require('./../lib/redmine'),
        redmine     = new Redmine(conf.redmine),
        Transmission = require('./../lib/Transmission')
    ;
    
    module.exports = function(){
        
        redmine.getIssues({query_id: "732", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err);
        
            // number of high priority issues
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs["high priority issues count"],
                    "value": data['total_count']
                })
            );
            
        });

    }