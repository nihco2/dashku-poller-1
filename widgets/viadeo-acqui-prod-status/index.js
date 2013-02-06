    
    var 
        conf        = require('./../../conf'),
        request     = require('request'),
        timeCounter = require('./../../lib/timeCounter'),
        Transmission = require('./../../lib/Transmission'),
        ref         = "acqui webapp production status"
    ;
    
    module.exports = function(){
        
        // Acqui status
        timeCounter.register('acqui status');
        request.get({url : "http://join.viadeo.com"}, function(error, response){
            if (!error) {
            
                request.post(
                    new Transmission().addBodyParams({
                        "_id" : conf.dashku.widgetsRefs[ref],
                        "value": response.statusCode,
                        "delay": timeCounter.getFormatedDelay('acqui status')
                    }),
                    function(err, res){ 
                        if(res.statusCode == 200) {
                            console.log("OK : " + ref);
                        } else { console.warn("KO : " + ref + " Transmission failed"); }
                    }
                );
                        
            }
        });    
    }