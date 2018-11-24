document.addEventListener("DOMContentLoaded", function () {

let navlinks = document.getElementsByClassName("nav-link")

for(let i=0; i<navlinks.length; i++) {
    document.addEventListener("click", function(){
        if(window.innerWidth<770) {
            console.log(window.innerWidth)
        document.getElementById("hamburgerMenu").click()
        }
    });
}

});
