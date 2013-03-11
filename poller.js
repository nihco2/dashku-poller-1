 
    var 
        schedule    = require('./lib/scheduler'),
        _           = require('underscore'),
        conf        = require('./conf')
    ;
    
    _.each(conf.dashku.widgets, function(widget, next){
        
        schedule.add(widget.period.count, widget.period.unit, require(widget.dir));
        
    });
    
    

    