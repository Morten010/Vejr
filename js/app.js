let loading = document.querySelector('.loading-screen');


//remove loading screen
function removeLoading(){

    setTimeout(() => {
        loading.remove();
    },100)
    
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
