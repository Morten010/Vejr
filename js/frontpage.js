const myApp = document.getElementById("app")
const heading = document.querySelector("h1")
let myData = null;

//get location
const getLocation = async () => {
    console.log('checking location');
    //if sucessfull
    const success = async (pos) => {
        const crd = pos.coords;

        const lat = crd.latitude;
        const long = crd.longitude;

        const weather = await getWeatherDay(lat, long)

    };
      //if not sucessfull
    function error() {
    document.querySelector('body').innerHTML += `
    <div id="fail">
        <img src="assets/location.svg" alt="Location not found icon">
        <div>
            It seems like Geolocation, which is required for this page, is not enabled in your browser. Please turn it on.
        </div>
    </div>
    `;
    };
    //check location
    navigator.geolocation.getCurrentPosition(success, error);

};

const getWeatherDay = async (lat, lon) => {

    cityLat = lat.toFixed(4)
    cityLon = lon.toFixed(4)
    lat = lat.toFixed(2)
    lon = lon.toFixed(2)

    //gets today and tommorows date
    const now = new Date();
    const tommorow = new Date(Date.now() + (3600 * 1000 * 24));

    //formats it into year-month-day to put it into the api
    let nowFormatted = dayjs(now).format('YYYY-MM-DD');
    let tommorowFormatted = dayjs(tommorow).format('YYYY-MM-DD');

    //fetch api
    let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode&start_date=${nowFormatted}&end_date=${tommorowFormatted}`)
        .then(response => response.json())
        .then(data => {
            return data
        });

        console.log(response);

    myData = filterWeatherDay(response);

    buildToday(myData);

    getCity(cityLon, cityLat);

    removeLoading();

};

//get city name
function getCity(lon, lat){
    const apiKey = "761636bc22dba71d41b875f26116ae36"
    const cityApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`;
    
    let city = fetch(cityApi)
    .then(response => response.json())
    .then(data => {
        heading.innerHTML = data[0].name;
    });

}

function filterWeatherDay(data){
    console.log(data);
    let currentTime = new Date(data.current_weather.time);

    let temp = data.hourly.temperature_2m;
    let humidity = data.hourly.relativehumidity_2m;
    let wind = data.hourly.windspeed_10m;
    let weatherCodes = data.hourly.weathercode;
    let time = data.hourly.time;

    const num = currentTime.getHours() + 1;

    temp = filterArray(temp, num);
    humidity = filterArray(humidity, num)
    wind = filterArray(wind, num)
    weatherCodes = filterArray(weatherCodes, num)
    time = filterArray(time, num)

    return{
        temp,
        humidity,
        wind,
        weatherCodes,
        time
    }
}

//filter array for the 24 hour list
function filterArray(data, time){

    let filterData = data
    //takes of the hours of the day which already has passed
    i = 0;
    while(i < time){
        filterData.shift()
        i++;
    };

    //takes the next 24 hours
    filterData = filterData.slice(0, 24);

    return filterData
}

function buildToday(data){
    console.log(data);
    let nowTemp = data.temp[0];
    let nowHumidity = data.humidity[0];
    let nowTime = new Date(data.time[0]);
    let nowWeathercode = data.weatherCodes[0];
    let nowWind = data.wind[0];

    nowTime = dayjs().format('h:mm')

    myApp.innerHTML = `
    <div id="weather-now">
        <div class="day">
            <img src="assets/weather-icons/${daysWeatherCode(nowWeathercode)}">
            <div class="text">
              <span class="span-2">${nowTime}</span>
              <span class="span-2">${nowWind} m/s</span>
              <span class="side-border">${nowTemp}&deg;</span>
              <span>${nowHumidity}%</span>
            </div>
        </div>
    </div>
    `


}

getLocation()