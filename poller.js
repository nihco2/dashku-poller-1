 
    var 
        schedule    = require('./lib/scheduler'),
        _           = require('underscore'),
        conf        = require('./conf')
    ;
    
    _.each(conf.dashku.widgets, function(widget){
        
        if(widget.active) schedule.add(widget.period.count, widget.period.unit, require(widget.dir));
        
    });
    
    

    