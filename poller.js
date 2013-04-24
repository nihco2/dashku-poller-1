 
    var 
        schedule    = require('./assets/scheduler'),
        _           = require('underscore'),
        conf        = require('./conf')
    ;
    
    _.each(conf.dashku.widgets, function(widget){
        
        if(widget.active) {
            schedule.add(
                widget.period, 
                require(widget.dir).then(function(result){
                    console.log(widget.reference, result);
                })
            );
        }
        
    });