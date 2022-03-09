const baseURL = "https://community-open-weather-map.p.rapidapi.com/forecast";
const apiHost = "community-open-weather-map.p.rapidapi.com";
const apiKey = "a2e5d3c80fmshe76e667a371f3a2p1690dejsnb9608ca058bd";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(express.static("website"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const port = 8000;
app.listen(port, () => console.log(`Running localhost on port: ${port}`));

app.get("/weather", (req, res) => {
    console.log(req.url);
    console.log(req.query);
    const zip = req.query.zip;
    const options = {
        method: "GET",
        url: baseURL,
        params: {zip: zip},
        headers: {
          "x-rapidapi-host": apiHost,
          "x-rapidapi-key": apiKey
        }
      };

    axios.request(options)
    .then(function (response) {
        const samplesPerDay = 8;
        const avgTempForToday = response.data.list.slice(samplesPerDay)
            .map(item => item.main.temp)
            .reduce((acum, curr, _, arr) => acum + curr / arr.length, 0);
	    const tempInCelsius = Math.round(kelvinToCelsius(avgTempForToday));
        const json = { temp: tempInCelsius};
        res.send(json);
        console.log(json);
    }).catch(function (error) {
        console.error(error);
    });
});

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

const entries = [{
    date: 1646792019819,
    zip: 55124,
    temp: -9.222193749999957,
    feeling: "Hello world!👋 from Minnesota 🥶"
}];
app.get("/entries", (req, res) => {
    console.log(req.path)
    res.send(entries);
    console.log(entries)
});

app.post("/entries", (req, res) => {
    console.log(req.path)
    console.log(req.body)
    const entity = { 
        date: Date.now(), 
        ...req.body
    };
    entries.push(entity);
    res.sendStatus(200);
    console.log(entries)
});
