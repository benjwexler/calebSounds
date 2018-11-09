console.log("Hey")
document.addEventListener("turbolinks:load", changeValue)
document.addEventListener("turbolinks:load", listener)


function changeValue() {
    document.getElementById("sound_name").value = document.getElementById("whichKit").value
    
}

function listener() {
    document.getElementById("whichKit").addEventListener("input", changeValue);
}



