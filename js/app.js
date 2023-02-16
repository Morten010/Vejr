let loading = document.querySelector('.loading-screen');


//remove loading screen
function removeLoading(){

    setTimeout(() => {
        loading.remove();
    },100)
    
}