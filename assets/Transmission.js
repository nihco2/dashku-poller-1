    
    var _           = require('underscore'),
        conf        = require('./../conf')
    ;
    
    module.exports = function (reference){
        this.url = conf.dashku.url;
        this.body = { apiKey: conf.dashku.apiKey, _id : reference };
        this.json = true;
        this.addBodyParams = function(params){
            _.extend(this.body, params);
            return this;
        }
    };