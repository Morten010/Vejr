const loading = document.querySelector('.loading-screen');


//remove loading screen
function removetimer(){

    setTimeout(() => {
        loading.remove();
    },2500)
    
}

