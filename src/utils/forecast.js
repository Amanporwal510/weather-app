const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7ddea7f33046ed65622d8b17832d01a7&query="+ latitude +","+ longitude;
    
    request({ url, json : true}, (error, response) => {
        if(error) {
            callback({
                error: "Unable to connect weather services"
            }, undefined);
        }else if(response.body.error) {
            callback({
                error: "Unable to find location"
            }, undefined);
        }else {
            const data = {
                humidity: response.body.current.humidity,
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                windspeed: response.body.current.wind_speed,
                region: response.body.location.region,
                country: response.body.location.country
            }
            callback(undefined, data);
        }
    });
}

module.exports = forecast;

/************************
    Future Reference
 ***********************/

// const url = "http://api.weatherstack.com/current?access_key=7ddea7f33046ed65622d8b17832d01a7&query=28.681620,77.272118&units=s";
// // const url = 'http://api.weatherstack.com/current?access_key=7ddea7f33046ed65622d8b17832d01a7&query=&units=s';
// request( {url: url, json: true}, (error,response)=> {
//     if(error) {
//         console.log("Unable to connect weather services");
//     }else if (response.body.error) {
//         console.log("Unable to find location");
//     }else {
//         console.log(response.body.current);
//     }
// });
