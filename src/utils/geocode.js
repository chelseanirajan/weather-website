const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c643f3c845444ea01eb3ad800d23ad91&query='+address+'&units=f';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location to the response', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, {
                latitude: body.location.lat,
                longitude: body.location.lon,
                location: body.location.name
            })
        }
    })

}
module.exports = geocode;
