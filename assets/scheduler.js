    
    var 
        schedule        = require('pomelo-schedule'),
        moment          = require('moment'),
        Transmission    = require('./Transmission'),
        request         = require('request')
    ;
    
    module.exports = (function(){
    
        return {
        
            add : function(periodInstructionsString, job, reference){
            
                var periodInstructions = periodInstructionsString.split(' after ');
            
                var 
                    period = periodInstructions[0].split(' '),
                    delay = periodInstructions[1] ? periodInstructions[1].split(' ') : undefined
                ;
                
                var 
                    normPeriod = moment.duration(+period[0], period[1]).asMilliseconds(),
                    normDelay  = (delay) ? Date.now() + moment.duration(+delay[0], delay[1]).asMilliseconds() : Date.now()
                ;
                
                console.log(normPeriod, normDelay);
            
                schedule.scheduleJob({
                        start : normDelay,
                        period : normPeriod
                    }, function(){
                        job().then(function(result){
                        
                            var transmit = (new Transmission(reference)).addBodyParams(result);
                        
                            request.post(
                                transmit,
                                function(err, res){ 
                                    if(res.statusCode == 200) {
                                        console.log("OK : " + reference);
                                    } else { console.warn("KO : " + reference + " Transmission failed"); }
                                }
                            );
                            
                        });
                    }
                );
                
                return this;
            }
       }; 
        
    }());
    
