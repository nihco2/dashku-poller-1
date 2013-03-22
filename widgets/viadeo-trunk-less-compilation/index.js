
    var 
        path        = require('path'),
        Q           = require('q')
    ;
    
    function main(){
    
        var 
            localConf   = require('./conf'),
            repo        = localConf.svn.repo
        ;
        
        Q
            .fcall(function(){return repo})
            .then(require('./assets/svn-co'))               // checkout svn repo and returns directory where co done
            .then(require('./assets/buildTargetPath'))      // returns target file (wro.xml file)
            .then(require('./assets/parseXmlFile'))         // returns wro.xml as js object
            .then(require('./assets/getLessFiles'))         // returns an array of css files paths
            .then(require('./assets/lessCheck'))            // launch less parsind and returns a report
            .then(require('./assets/transmitReport'))       // transmit report
        ;
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }