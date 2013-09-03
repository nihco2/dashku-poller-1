var request     = require('request')
var conf        = require('../conf')
var url        = require('url')


var apiKey      = conf.dashku.apiKey
var apiUrl      = conf.dashku.apiUrl
var dashName    = conf.dashku.name

var dashId

// Create dashboard
request.post(
    url.resolve(apiUrl, 'dashboards') + '?apiKey=' + apiKey,
    { form: { name:dashName } }, 
    createWidgets
)

function createWidgets(err, resp){
    if (err) {
        throw new error('unable to create dashboard', err)
    } else {
        dashId = JSON.parse(resp.body)._id
        console.log('got dash ID : ', dashId)
    }
}