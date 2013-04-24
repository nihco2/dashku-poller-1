    
    var 
        schedule        = require('pomelo-schedule'),
        moment          = require('moment'),
        Transmission    = require('./Transmission'),
        request         = require('request')
    ;
    
    module.exports = (function(){
    
        return {
        
            add : function(periodString, job, reference){
            
                var 
                    period = periodString.split(' '),
                    periodValue = +period[0],
                    periodUnit = period[1]
                ;
            
                schedule.scheduleJob(
                    {
                        start : Date.now(),
                        period : moment.duration(periodValue, periodUnit).asMilliseconds()
                    },
                    function(){
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
    
