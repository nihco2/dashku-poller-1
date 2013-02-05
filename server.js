 
    var _           = require('underscore'),
        request     = require("request"),
        conf        = require('./conf'),
        Redmine     = require('./lib/redmine'),
        timeCounter = require('./lib/timeCounter'),
        redmine     = new Redmine(conf.redmine)
    ;
    
    
    // bugs number & bugs chart
    
    var delay = parseInt(1/12*60*60*1000), // every 5 min
        timer = setInterval(poll, delay)
    ;
    
    // default transmission wrapper
    
    function Transmission(){
        this.url = conf.dashku.url;
        this.body = { apiKey: conf.dashku.apiKey};
        this.json = true;
        this.addBodyParams = function(params){
            _.extend(this.body, params);
            return this;
        }
    };
    
    // poller
    
    function poll(){
        
        // *** Redmine stuff ***
        
        redmine.getIssues({query_id: "640", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err);
        
            // big number
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs["issues count"],
                    "value": data['total_count']
                })
            );
            
            // bug chart
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs["bugs trend"],
                    "value": data['total_count']
                })
            );
            
        });
        
        redmine.getIssues({query_id: "732", limit : "1"}, function(err, data) {
        
            if(err) throw new Error(err);
        
            // number of high priority issues
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs["high priority issues count"],
                    "value": data['total_count']
                })
            );
            
        });
        
        // *** Viadeo stuff ***
        
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
        
        // Acqui status
        timeCounter.register('acqui status');
        request.get({url : "http://join.viadeo.com"}, function(error, response){
            if (!error) {
            
                request.post(
                    new Transmission().addBodyParams({
                        "_id" : conf.dashku.widgetsRefs["acqui webapp production status"],
                        "value": response.statusCode,
                        "delay": timeCounter.getFormatedDelay('acqui status')
                    })
                );
                        
            }
        });
    
    }
    
    // poll immediately (debug stuff)
    
    poll();
