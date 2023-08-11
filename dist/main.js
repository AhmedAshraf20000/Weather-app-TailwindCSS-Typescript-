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
function getWeather(city = `cairo`) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://api.weatherapi.com/v1/forecast.json?key=e34cd4dd46884d30983114130230708&q=${city}&days=3`);
        let data = (yield resp.json()).forecast.forecastday;
        console.log(data);
    });
}
getWeather();
