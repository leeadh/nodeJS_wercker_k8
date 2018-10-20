const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '813d4d9b7318be323047f5a102e4377a';

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
      console.log("there is error 1 "+ err);
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
        console.log("there is error 2 "+ err);
      } else {
        
        let weatherText = `It's ${weather.main.temp} fahrenheit in ${weather.name}!`;
        console.log(weather.weather)
        console.log(weather.coord)
        console.log(weather.coord.lon)
        res.render('index', {weather: weatherText, weatherdata: weather, coordinates: weather.coord, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
