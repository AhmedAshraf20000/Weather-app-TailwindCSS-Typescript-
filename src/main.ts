const dateParag: HTMLParagraphElement[] = Array.from(document.querySelectorAll(".box header p"));
const cityParag: HTMLParagraphElement[] = Array.from(document.querySelectorAll("#city"))
const tempParag: HTMLParagraphElement[] = Array.from(document.querySelectorAll("#temp"));
const conditionParag: HTMLParagraphElement[] = Array.from(document.querySelectorAll("#condition"));
const rainSpans: HTMLSpanElement[] = Array.from(document.querySelectorAll("#rain"));
const windSpans: HTMLSpanElement[] = Array.from(document.querySelectorAll("#wind"));
const locationSearch = <HTMLInputElement>document.getElementById("location-search");
const btn = <HTMLButtonElement>document.getElementById("btn");
var city: string = "cairo";

function setDateHeader(dateParag: HTMLParagraphElement[]) {
    for (let i = 0; i < 6; i += 2) {
        let today = new Date();
        let nextDay: any = new Date();
        nextDay.setDate(today.getDate() + i / 2);
        nextDay = nextDay.toDateString().slice(0, 10).split(" ");
        dateParag[i].innerHTML = nextDay[0]
        dateParag[i + 1].innerHTML = `${nextDay[2]} ${nextDay[1]}`;
    }
}

function setLocation(country: string, gov: string) {
    cityParag.map(e => e.innerHTML = `${country}-${gov}`)

}

function setWeather(forCastDay: any) {
    tempParag.map((e, i) => e.innerHTML = `${forCastDay[i].day.avgtemp_c}`);
    conditionParag.map((e, i) => e.innerHTML = forCastDay[i].day.condition.text);
    rainSpans.map((e, i) => e.innerHTML = forCastDay[i].day.daily_chance_of_rain);
    windSpans.map((e, i) => e.innerHTML=forCastDay[i].day.maxwind_kph);
}

async function getWeather(city: string) {
    const resp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e34cd4dd46884d30983114130230708&q=${city}&days=3`);
    let data: any = (await resp.json());
    let country: string = data.location.country;
    let gov: string = data.location.name;
    let forCastDay = data.forecast.forecastday;
    setLocation(country, gov);
    setWeather(forCastDay);
    setDateHeader(dateParag);
}
getWeather(city);


btn.onclick = () => {
    city = locationSearch.value;
    getWeather(city);
}

