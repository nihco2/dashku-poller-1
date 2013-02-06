
    var 
        conf        = require('./../../conf'),
        request     = require('request'),
        redmine     = new (require('./../../lib/redmine'))(conf.redmine),
        Transmission = require('./../../lib/Transmission'),
        ref         = "high priority issues count"
    ;
    
    module.exports = function(){
        
        redmine.getIssues({query_id: "732", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err, "KO : " + ref);
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs[ref],
                    "value": data['total_count']
                }),
                function(err, res){ 
                    if(res.statusCode == 200) {
                        console.log("OK : " + ref);
                    } else { console.warn("KO : " + ref + " Transmission failed"); }
                }
            );
            
        });

    }