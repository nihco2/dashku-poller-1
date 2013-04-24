    
    var 
        schedule   = require('pomelo-schedule'),
        moment     = require('moment')
    ;
    
    module.exports = (function(){
    
        return {
            add : function(periodString, job){
            
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
                    job
                );
                
                return this;
            }
       }; 
        
    }());