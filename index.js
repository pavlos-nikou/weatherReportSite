const express = require("express")
const app = express();
const path = require("path");
const https = require("https");
const axios = require("axios");
const { url } = require("inspector");
const { response } = require("express");


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


let weatherReport = async () => {
    return await axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=34.86&lon=32.72&appid=3df1e5f84816d3542c503b8db2e4eaf5&units=metric")
}

let hour24 = (hour12) => {
    [hour, ampm] = hour12.split(" ")
    if (ampm === "pm") {
        return parseInt(hour) + 12
    }
    return hour
}

let normaliseMinute = (minute) => {
    if (minute.length === 1) {
        return `0${minute}`
    }
    return minute
}

// reutrns obj with date data converted from unixTimestamp
const toDate = (unixTimestamp) => {
    dateObject = new Date((unixTimestamp) * 1000)
    date = {
        day: dateObject.toLocaleString("en-cy", { day: "numeric" }),
        month: dateObject.toLocaleString("en-cy", { month: "numeric" }),
        year: dateObject.toLocaleString("en-cy", { year: "numeric" }),
        hour: hour24(dateObject.toLocaleString("en-cy", { hour: "numeric" })),
        minute: normaliseMinute(dateObject.toLocaleString("en-cy", { minute: "numeric" }))
    }
    return date
}

const setDates = ()=>{

}

// function that adds the ful url to the hourly weather icon instead of just the icon code
const getIconsUrls = (hourly) => {
    hourly.forEach(hour => {
        hour.weather[0].icon = `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
    });
    return hourly
}

app.get("/", async (req, res) => {
    let report = await weatherReport()
    let current = report.data.current
    let data = {
        tempNow: current.temp,
        fealsLike: current.feals_like,
        sunrise: toDate(current.sunrise),
        sunset: toDate(current.sunset),
        weatherIcon: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
        windSpeed: current.wind_speed,
        windDeg: current.wind_deg,
        windGust: current.wind_gust,
        main: current.weather[0].main,
        hourly: getIconsUrls(report.data.hourly)
    }
    res.render("home", { data: data })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})