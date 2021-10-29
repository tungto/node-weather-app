const request = require("request");

const API_KEY = "09586af42f75940103f352e4c2a364ea";
const NUMBER_CITY = 3;

const geocode = (address, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    address
  )}&appid=${API_KEY}`;
  console.log(url);
  // const url = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${NUMBER_CITY}&appid=${API_KEY}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (response.body.error) {
      callback(response.body.error);
    } else {
      callback(undefined, response.body.coord);
    }
  });
};

module.exports = geocode;
