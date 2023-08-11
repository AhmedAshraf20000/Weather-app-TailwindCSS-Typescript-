async function getWeather(city = `cairo`) {
    const resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=e34cd4dd46884d30983114130230708&q=${city}&days=3`
    );
    let data = (await resp.json()).forecast.forecastday
    console.log(data);


}
getWeather()