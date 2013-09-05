var url         = require('url')
var path        = require('path')
var fs          = require('fs')
var request     = require('request')
var _           = require('underscore')
var conf        = require('../conf')


var apiKey      = conf.dashku.apiKey
var apiUrl      = conf.dashku.apiUrl
var dashName    = conf.dashku.name
var cwd         = process.cwd()

var dashId

// Create dashboard
request.post(
    url.resolve(apiUrl, 'dashboards') + '?apiKey=' + apiKey,
    { form : { name:dashName } }, 
    createWidgets
)

function createWidgets(err, resp){
    if (err) {
        console.error('unable to create dashboard\n', err)
        throw new error(err)
    } else {
        dashId = JSON.parse(resp.body)._id
        console.log('dashboard created with id :', dashId)
        _.each(conf.dashku.widgets, createSingleWidget)
    }
}

function createSingleWidget(widgetSpec, name){
    
    if(!widgetSpec.active) return false
    
    var shipping = {
        name : name,
        css : css = fs.readFileSync(
            path.join(cwd, widgetSpec.dir, '/client/widget.css'), 
            'utf8'
        ),
        js : fs.readFileSync(
            path.join(cwd, widgetSpec.dir, '/client/widget.js'), 
            'utf8'
        ),
        html : fs.readFileSync(
            path.join(cwd, widgetSpec.dir, '/client/widget.html'), 
            'utf8'
        ),
        width : widgetSpec.width,
        height : widgetSpec.height
    }
    
    //console.log(shipping)
    
    request.post(
        url.resolve(apiUrl, 'dashboards/' + dashId + '/widgets') + '?apiKey=' + apiKey,
        { form : shipping },
        function(err, resp){
            if (err) {
                console.error('unable to create widget :', shipping.name, '\n', err)
                throw new error(err)
            } else {
                 console.log('widget created :', shipping.name)
            }
        }
    )
    
}