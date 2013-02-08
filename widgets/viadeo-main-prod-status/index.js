    
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(process.env.PWD + '/lib/timeCounter'),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "main webapp production status"
    ;
    
    function main(){
    
        // Prod status
        timeCounter.register('prod status');
        request.get({url : conf.viadeo.url.main.prod}, function(error, response){
            
            if(error) throw new Error(err, "KO : main webapp production status");
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs[ref],
                    "value": response.statusCode,
                    "delay": timeCounter.getFormatedDelay('prod status')
                }),
                function(err, res){
                    if(res.statusCode == 200) {
                        console.log("OK : " + ref);
                    } else { console.warn("KO : " + ref + " Transmission failed"); }
                }
            );
                
        });
         
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }