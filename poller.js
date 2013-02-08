 
    var schedule   = require('./lib/scheduler');
    
    schedule
        .add(30, 'minutes',  require('./widgets/redmine-issues-trend'))
        .add(5,  'minutes',  require('./widgets/redmine-issues-count'))
        .add(5,  'minutes',  require('./widgets/redmine-high-priority-issues-count'))
        .add(5,  'minutes',  require('./widgets/redmine-issues-repartition'))
        .add(5,  'minutes',  require('./widgets/viadeo-main-prod-status'))
        .add(5,  'minutes',  require('./widgets/viadeo-acqui-prod-status'))
    ;

    