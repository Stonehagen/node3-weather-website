const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=" + 
    "73a9bb71be18076997ee4a067785efe3&query=" + latitude + "," + longitude + 
    "&units=m"

    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback(res.body.error.info, undefined)
        } else {
            callback(undefined, res.body.current.weather_descriptions[0] + 
                ". It is currently " + res.body.current.temperature +
                " degrees out. It feels like " + res.body.current.feelslike + 
                " degrees out")
        }
    })

}

module.exports = forecast