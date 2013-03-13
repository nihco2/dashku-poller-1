 
    var 
        conf        = require(process.env.PWD + '/conf'),
        Q           = require('q'),
        path        = require('path'),
        request     = require('request'),
        Transmission = require(process.env.PWD + '/lib/Transmission'),
        ref         = "viadeo trunk less compilation"
    ;
    
    function main(){
    
        var 
            localConf   = require('./conf'),
            repo        = path.join(localConf.svn.repo, localConf.svn.dir)
        ;
        
        Q
            .fcall(function(){return repo})
            .then(require('./assets/svn-co'))
            .then(require('./assets/buildTargetPath'))
            .then(require('./assets/parseXmlFile'))
            .then(require('./assets/harvestData'))
            .then(require('./assets/requestResources'))
            .then(function(report){
                request.post(
                    new Transmission().addBodyParams({
                        "_id" : conf.dashku.widgets[ref].reference,
                        "data": report
                    }),
                    function(err, res){
                        if(res.statusCode == 200) {
                            console.log("OK : " + ref);
                        } else { console.warn("KO : " + ref + " Transmission failed"); }
                    }
                );
            })
        ;
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }