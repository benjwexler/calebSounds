console.log("Hey")
document.addEventListener("turbolinks:load", changeValue)
document.addEventListener("turbolinks:load", listener)


function changeValue() {
    document.getElementById("kit_id").value = document.getElementById("whichKit").value
    
}

function listener() {
    document.getElementById("whichKit").addEventListener("input", changeValue);
}



