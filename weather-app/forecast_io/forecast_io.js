var request = require('request');

const get_weather = (weather, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${weather.api_key}/${weather.lat},${weather.long}`,
        json: true
    }, (error, response, body) =>{
    
        if(error){
            callback('unable to connect to forecast.io servers');
        }else if(response.statusCode === 400){
            callback('unable to fetch weather');
        }else if(response.statusCode === 200){
            console.log(body.currently.temperature);
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    get_weather
};