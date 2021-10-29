const request = require("request");

const API_KEY = "09586af42f75940103f352e4c2a364ea";
const NUMBER_CITY = 3;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${NUMBER_CITY}&appid=${API_KEY}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (response.body.error || +response.body.cod === 400) {
      callback("Unable to find location");
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
