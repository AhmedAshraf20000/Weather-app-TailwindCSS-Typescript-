"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dateParag = Array.from(document.querySelectorAll(".box header p"));
const cityParag = Array.from(document.querySelectorAll("#city"));
const tempParag = Array.from(document.querySelectorAll("#temp"));
const conditionParag = Array.from(document.querySelectorAll("#condition"));
const rainSpans = Array.from(document.querySelectorAll("#rain"));
const windSpans = Array.from(document.querySelectorAll("#wind"));
const locationSearch = document.getElementById("location-search");
const btn = document.getElementById("btn");
var city = "cairo";
function setDateHeader(dateParag) {
    for (let i = 0; i < 6; i += 2) {
        let today = new Date();
        let nextDay = new Date();
        nextDay.setDate(today.getDate() + i / 2);
        nextDay = nextDay.toDateString().slice(0, 10).split(" ");
        dateParag[i].innerHTML = nextDay[0];
        dateParag[i + 1].innerHTML = `${nextDay[2]} ${nextDay[1]}`;
    }
}
function setLocation(country, gov) {
    cityParag.map(e => e.innerHTML = `${country}-${gov}`);
}
function setWeather(forCastDay) {
    tempParag.map((e, i) => e.innerHTML = `${forCastDay[i].day.avgtemp_c}`);
    conditionParag.map((e, i) => e.innerHTML = forCastDay[i].day.condition.text);
    rainSpans.map((e, i) => e.innerHTML = forCastDay[i].day.daily_chance_of_rain);
    windSpans.map((e, i) => e.innerHTML = forCastDay[i].day.maxwind_kph);
}
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://api.weatherapi.com/v1/forecast.json?key=e34cd4dd46884d30983114130230708&q=${city}&days=3`);
        let data = (yield resp.json());
        let country = data.location.country;
        let gov = data.location.name;
        let forCastDay = data.forecast.forecastday;
        setLocation(country, gov);
        setWeather(forCastDay);
        setDateHeader(dateParag);
    });
}
getWeather(city);
btn.onclick = () => {
    city = locationSearch.value;
    getWeather(city);
};
