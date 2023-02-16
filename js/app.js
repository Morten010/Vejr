let loading = document.querySelector('.loading-screen');


//remove loading screen
function removeLoading(){

    setTimeout(() => {
        loading.remove();
    },100)
    
}

//get weekday
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayName(date){
    date = new Date(date);
    date = date.getDay();

    date = days[date];
    return date;
};
