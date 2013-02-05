
    var 
        conf        = require('./../conf'),
        request     = require('request'),
        redmine     = new (require('./../lib/redmine'))(conf.redmine),
        Transmission = require('./../lib/Transmission')
    ;
    
    module.exports = function(){
        
        redmine.getIssues({query_id: "640", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err);
            
            // bug chart
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs["bugs trend"],
                    "value": data['total_count']
                })
            );
            
        });

    }