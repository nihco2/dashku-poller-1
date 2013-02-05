    
    var 
        conf        = require('./../conf'),
        request     = require('request'),
        timeCounter = require('./../lib/timeCounter'),
        Transmission = require('./../lib/Transmission')
    ;
    
    module.exports = function(){
    
        // Prod status
        timeCounter.register('prod status');
        request.get({url : "http://www.viadeo.com/fr/connexion/"}, function(error, response){
            if (!error) {
            
                request.post(
                    new Transmission().addBodyParams({
                        "_id" : conf.dashku.widgetsRefs["main webapp production status"],
                        "value": response.statusCode,
                        "delay": timeCounter.getFormatedDelay('prod status')
                    })
                );
                        
            }
        });
         
    }