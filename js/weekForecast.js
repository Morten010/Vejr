const weekGrid = document.querySelector('#week-grid');


//get location
const getLocation = async () => {
    
    const success = async (pos) => {
        const crd = pos.coords;

        const lat = crd.latitude;
        const long = crd.longitude;

        const weather = await getWeather(lat, long)
        
        console.log(weather);
        console.log(new Date(weather.time[9]));

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

    console.log(data);
    
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
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[9])}" alt="">
                    <h2>${day1}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[9]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[33])}" alt="">
                    <h2>${day2}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[33]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[57])}" alt="">
                    <h2>${day3}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[57]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[81])}" alt="">
                    <h2>${day4}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[81]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[105])}" alt="">
                    <h2>${day5}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[105]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[129])}" alt="">
                    <h2>${day6}</h2>
                </aside>
                <div class="text">
                    <span class="time">9:00</span>
                    <span class="deg">${temp[129]}&deg;c</span>
                </div>
            </div>

            <div class="day last">
                <aside>
                    <img src="assets/weather-icons/${daysWeatherCode(wwo[153])}" alt="">
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

//sort weather code number to image name
const daysWeatherCode = (day) => {
    let wwo = undefined;


    if(day = 0) {
        wwo = 'sun.svg' //Clear sky
    } else if(day = 1) {
        wwo = 'sunny-and-cloudy.svg' //Mainly clear
    } else if(day = 2) {
        wwo = 'cloudy-sun.svg' // partly cloudy
    } else if(day = 3) {
        wwo = 'clouds.svg' //overcast
    } else if(day = 45) {
        wwo = 'clouds.svg' //Fog
    } else if(day = 48) {
        wwo = 'rain.svg' //depositing rime fog
    }else if(day = 51) {
        wwo = 'rain.svg' //Drizzle Light
    }else if(day = 53) {
        wwo = 'rain.svg' //Drizzle moderate
    }else if(day = 55) {
        wwo = 'rain.svg' //Drizzle dense intensity
    }else if(day = 56) {
        wwo = 'rain.svg' //Freezing Drizzle Light
    }else if(day = 57) {
        wwo = 'rain.svg' //Freezing Drizzle Dense
    }else if(day = 61) {
        wwo = 'rain.svg' //Rain slight
    }else if(day = 63) {
        wwo = 'rain.svg' //Rain moderate
    }else if(day = 65) {
        wwo = 'rain.svg' //Rain heavy
    }else if(day = 66) {
        wwo = 'rain.svg' //Freezing Rain light
    }else if(day = 67) {
        wwo = 'rain.svg' //Freezing Rain heavy
    }else if(day = 71) {
        wwo = 'rain.svg' //Snow fall slight
    }else if(day = 73) {
        wwo = 'rain.svg' //Snow fall moderate
    }else if(day = 75) {
        wwo = 'rain.svg' //Snow fall heavy
    }else if(day = 77) {
        wwo = 'rain.svg' //Snow grains
    }else if(day = 80) {
        wwo = 'rain.svg' //Rain showers slight
    }else if(day = 81) {
        wwo = 'rain.svg' //Rain showers moderate
    }else if(day = 82) {
        wwo = 'rain.svg' //Rain showers violent
    }else if(day = 85) {
        wwo = 'rain.svg' //Snow showers slight
    }else if(day = 86) {
        wwo = 'rain.svg' // snow showers heavy
    }

    return wwo;
}

getLocation()

