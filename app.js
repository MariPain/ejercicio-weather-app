const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const request = require('request');
const apiKey = 'f4786af8de179013d8a7d1fae6ff5895';
//...


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index');
    console.log(req.body.city);
})

app.listen(3000, function() {
        console.log('Example app listening on port 3000!')
    })
    //...
app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})