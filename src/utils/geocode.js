const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + 
    ".json?access_token=pk.eyJ1Ijoic3RvbmVoYWdlbiIsImEiOiJja2J3bjdlc2swYmRkMnNuYWM2aGFieGxkIn0" + 
    ".iohn_vARECq_WR44pmd_ug&limit=1"

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location service!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location, Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode