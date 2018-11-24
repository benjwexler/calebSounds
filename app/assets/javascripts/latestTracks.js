document.addEventListener("DOMContentLoaded", function () {

const fakeSubmitBtn = document.getElementById("fakeSubmitBtn");
const createTrack = document.getElementById("createTrack");

console.log()


const soundcloudEmbed = document.getElementById("track_soundcloud_id")

var spliceSoundcloudId = (event) => { 

    if((event.type === "click") || (event.keyCode === 13)) {

    soundcloudLink = soundcloudEmbed.value.split('tracks/')[1]
    soundcloudEmbed.value = soundcloudLink.split('&')[0]
    createTrack.submit()
    }

    
    
};


fakeSubmitBtn.addEventListener("click", spliceSoundcloudId)

fakeSubmitBtn.addEventListener("keydown", spliceSoundcloudId)


});
