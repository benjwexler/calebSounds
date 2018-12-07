
document.addEventListener("DOMContentLoaded", function () {

document.getElementById("addToCartButton").addEventListener("click", function(){
    console.log(this.dataset.kitId)
    sessionStorage.setItem(`Kit${this.dataset.kitId}`, '1')
    console.log(sessionStorage)
});

})