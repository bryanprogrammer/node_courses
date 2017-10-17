var request = require('request');

var geocode_address = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json: true
        }, (error, response, body) =>{
            if(error){
                reject('unable to connect to google servers');
            }else if(body.status === "ZERO_RESULTS"){
                reject('unable to find that address');
            }else if(body.status === "OK"){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};



geocode_address('19147').then( (location) => {
    console.log(JSON.stringify(location, undefined, 2));
},(error_message) => {
    console.log(error_message);
});