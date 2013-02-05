    
    var _           = require('underscore'),
        conf        = require('./../conf')
    ;
    
    module.exports = function (){
        this.url = conf.dashku.url;
        this.body = { apiKey: conf.dashku.apiKey};
        this.json = true;
        this.addBodyParams = function(params){
            _.extend(this.body, params);
            return this;
        }
    };