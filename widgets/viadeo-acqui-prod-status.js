    
    var 
        conf        = require('./../conf'),
        request     = require('request'),
        timeCounter = require('./../lib/timeCounter'),
        Transmission = require('./../lib/Transmission')
    ;
    
    module.exports = function(){
        
        // Acqui status
        timeCounter.register('acqui status');
        request.get({url : "http://join.viadeo.com"}, function(error, response){
            if (!error) {
            
                request.post(
                    new Transmission().addBodyParams({
                        "_id" : conf.dashku.widgetsRefs["acqui webapp production status"],
                        "value": response.statusCode,
                        "delay": timeCounter.getFormatedDelay('acqui status')
                    })
                );
                        
            }
        });    
    }