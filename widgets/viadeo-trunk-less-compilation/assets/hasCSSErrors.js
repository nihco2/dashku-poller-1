var lint = require("csslint").CSSLint;

module.exports = function(cssString){

    var 
        report = lint.verify(cssString);
        messages = report.messages;
        len = messages.length;
        hasError = false
    ;
    
    if(len > 0) {
        
        while(len--){
            
            if(messages[len].type == "error"){
                hasError = true;
                break;
            }
            
        }
        
    }
    
    return hasError;

}