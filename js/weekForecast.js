const weekGrid = document.querySelector('#week-grid');


//get location
const getLocation = async () => {
    
    const success = async (pos) => {
        const crd = pos.coords;

        const lat = crd.latitude;
        const long = crd.longitude;

        const weather = await getWeather(lat, long)

        html(weather)
    };
      
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

    navigator.geolocation.getCurrentPosition(success, error);

};


//get weather infomation
const getWeather = async (lat, lon) => {

    const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode`

    const response = await fetch(api)

    const data = await response.json();

    const humidity = await data.hourly.relativehumidity_2m;
    const temp = await data.hourly.temperature_2m;
    const time = await data.hourly.time;
    const wwo = await data.hourly.weathercode;
    
    return {
        humidity,
        temp,
        time,
        wwo
    };

};


//generate html
const html = async (weather) => {

    const wwo = await weather.wwo;
    const temp = await weather.temp;
    const time = await weather.time;



    //day names
    const day1 = new Date(time[9]).toLocaleString("default", { weekday: "long" });
    const day2 = new Date(time[33]).toLocaleString("default", { weekday: "long" });
    const day3 = new Date(time[57]).toLocaleString("default", { weekday: "long" });
    const day4 = new Date(time[81]).toLocaleString("default", { weekday: "long" });
    const day5 = new Date(time[105]).toLocaleString("default", { weekday: "long" });
    const day6 = new Date(time[129]).toLocaleString("default", { weekday: "long" });
    const day7 = new Date(time[153]).toLocaleString("default", { weekday: "long" });
    
    weekGrid.innerHTML = `

    <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[9]}.svg" alt="">
                    <h2>${day1}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[9]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[33]}.svg" alt="">
                    <h2>${day2}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[33]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[57]}.svg" alt="">
                    <h2>${day3}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[57]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[81]}.svg" alt="">
                    <h2>${day4}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[81]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[105]}.svg" alt="">
                    <h2>${day5}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[105]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[129]}.svg" alt="">
                    <h2>${day6}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[129]}&deg;c</span>
                </div>
            </div>

            <div class="day last">
                <aside>
                    <img src="assets/weather-icons/${wwo[153]}.svg" alt="">
                    <h2>${day7}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[153]}&deg;c</span>
                </div>
            </div>

    `

    removeLoading()

}

getLocation()

