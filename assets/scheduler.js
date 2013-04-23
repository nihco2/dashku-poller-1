    
    var 
        schedule   = require('pomelo-schedule'),
        moment     = require('moment')
    ;
    
    module.exports = (function(){
    
        return {
            add : function(periodvalue, unit, job){
                schedule.scheduleJob(
                    {
                        start : Date.now(),
                        period : moment.duration(periodvalue, unit).asMilliseconds()
                    },
                    job
                );
                
                return this;
            }
       }; 
        
    }());