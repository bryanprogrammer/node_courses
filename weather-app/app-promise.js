var yargs = require('yargs'),
    axios = require('axios');

const api_key = "48df95f6b922196563783762e71a6906";
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
    .help()
    .alias('help', 'h')
    .argv;

var encoded_address = encodeURIComponent(argv.address),
    geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}`;

axios.get(geocode_url).then((response) => {
    if( response.data.status === 'ZERO_RESULTS')
        throw new Error('Unabale to find that address');
    
    var lat = response.data.results[0].geometry.location.lat,
        lng = response.data.results[0].geometry.location.lng;
    var weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    
    return axios.get(weather_url);
}).then((response) => {
    var temperature = response.data.currently.temperature,
        apparentTemperature = response.data.currently.apparentTemperature;
        console.log("****************************");
        console.log(`Weather Information`);
        console.log(`The temperature is  currently : ${temperature} but it feels like ${apparentTemperature}`);
    
}).catch((error) => {
    if(error.code === 'NOTFOUND')
        console.log('unable to connect to API SERVERS');
    else
        console.log(error.message);
});