var yargs = require('yargs'),
    geocode = require('./geocode/geocode'),
    forecast = require('./forecast_io/forecast_io');

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

geocode_address(argv.address).then( (location) => {
    console.log(JSON.stringify(location, undefined, 2));
}). then((results_weather) => {

}).catch((error_message) => {
    console.log(error_message);
});

geocode.geocode_address(argv.address, (error_message, results) =>{
    if(error_message){
        console.log(error_message);
    }else{
        console.log(results.address);
        console.log("Fetching Weather Information");
        
        forecast.get_weather(
            {api_key, lat: results.latitude, long: results.longitude},
            (error_message_weather, results_weather) => {
                if(error_message_weather){
                    console.log(error_message_weather);
                }else{
                    console.log("****************************");
                    console.log(`Weather Information`);
                    console.log(`The temperature is  currently : ${results_weather.temperature} but it feels like ${results_weather.apparentTemperature}`);
                }
        });
    }
});

