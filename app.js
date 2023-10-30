const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config({ path: "config.env" });

const app = express();
const fileData = fs.readFileSync("assets/weather.html", "utf8");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    fs.writeFileSync("assets/weather.html", fileData);
    res.sendFile(__dirname + "/assets/index.html");
});

app.post("/", function (req, res) {
    if (req.body.cityName === "") {
        res.redirect("/");
    } else {
        const query = req.body.cityName;
        const appid = process.env.APP_ID;
        const unit = "metric";
        https.get("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit, function (response) {
            response.on("data", function (data) {
                const weatherdata = JSON.parse(data);

                if (weatherdata.cod !== 200) {
                    res.redirect("/notfound");
                    res.send();
                } else {
                    // console.log(weatherdata);
                    const cityname = weatherdata.name;
                    const temp = weatherdata.main.temp;
                    const weatherDescription = weatherdata.weather[0].description;
                    const pressure = weatherdata.main.pressure;
                    const wind = weatherdata.wind.speed;
                    const humidity = weatherdata.main.humidity;

                    const sendData = {};
                    sendData.city = cityname;
                    sendData.temp = temp;
                    sendData.desc = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
                    sendData.pressure = pressure;
                    sendData.wind = wind;
                    sendData.humidity = humidity;
                    // console.log(sendData);

                    fs.readFile("assets/weather.html", "utf8", function (err, data) {
                        if (err) {
                            return console.log(err);
                        }

                        var result = data.replace("{%1%}", sendData.city);
                        result = result.replace("{%2%}", sendData.temp);
                        result = result.replace("{%3%}", sendData.desc);
                        result = result.replace("{%4%}", sendData.pressure);
                        result = result.replace("{%5%}", sendData.wind);
                        result = result.replace("{%6%}", sendData.humidity);

                        fs.writeFile("assets/weather.html", result, "utf8", function (err) {
                            if (err) return console.log(err);
                        });
                    });

                    res.redirect("/weather");
                    res.send();
                }
            });
        });
    }
});

app.get("/weather", function (req, res) {
    res.sendFile(__dirname + "/assets/weather.html");
});

app.get("/notfound", function (req, res) {
    res.sendFile(__dirname + "/assets/notfound.html");
});

app.listen(process.env.PORT, function () {
    console.log("Server is running");
});
