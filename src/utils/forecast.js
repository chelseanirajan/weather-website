const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c643f3c845444ea01eb3ad800d23ad91&query='+lat+','+lon+'&units=f';
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the lat lon location.', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined, undefined)
        }else {
            callback(undefined,
                {locationTime: body.location.localtime, temperature: body.current.temperature, humidity: body.current.pressure}
                )
        }
    })
}
module.exports = forecast;
