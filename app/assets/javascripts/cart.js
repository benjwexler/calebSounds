document.addEventListener("DOMContentLoaded", function () {

document.getElementById("shoppingCartLink").addEventListener("mouseover", function(){
    console.log("clicked")
    document.querySelector(".App").style.display = "flex";
});

document.getElementById("shoppingCartLink").addEventListener("mouseout", function(){
    console.log("clicked")
    document.querySelector(".App").style.display = "none";
});

});