    
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(process.env.PWD + '/lib/timeCounter'),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "acqui webapp production status"
    ;
    
    module.exports = function(){
        
        // Acqui status
        timeCounter.register('acqui status');
        request.get({url : conf.viadeo.url.acqui.prod}, function(error, response){
        
            if(error) throw new Error(err, "KO : acqui webapp production status");
            
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
            
        });    
    }