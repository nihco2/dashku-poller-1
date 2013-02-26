 
    var 
        conf        = require(process.env.PWD + '/conf'),
        request     = require('request'),
        timeCounter = require(process.env.PWD + '/lib/timeCounter'),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "viadeo trunk jscomplexity"
    ;
    
    function main(){
    
        var 
            conf = require('./conf'),
            scansvn = require('./assets/scan'),
            formatData = require('./assets/formatData'),
            repo = conf.svn.repo
        ;
        
        scansvn(repo, function(err, report){
            
            var data = formatData(report);
            
            request.post(
                new Transmission().addBodyParams({
                    "_id" : conf.dashku.widgetsRefs[ref],
                    "data": data
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