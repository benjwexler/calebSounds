document.addEventListener("DOMContentLoaded", function () {

// var widgetIframe1 = document.getElementById('sc-widget1'),
//   widget1 = SC.Widget(widgetIframe1);

// widget1.bind(SC.Widget.Events.READY, function () {
//   console.log("Yjefnifr")

//   widget1.getVolume(function (volume) {
//     console.log('current volume value is ' + volume);
//   });

//   widget1.setVolume(100);


// });

// var widgetIframe2 = document.getElementById('sc-widget2'),
//   widget2 = SC.Widget(widgetIframe2);

// widget2.bind(SC.Widget.Events.READY, function () {
//   console.log("Yjefnifr")

//   widget2.getVolume(function (volume) {
//     console.log('current volume value is ' + volume);
//   });

//   widget2.setVolume(100);


// });

// var widgetIframe3 = document.getElementById('sc-widget3'),
//   widget3 = SC.Widget(widgetIframe3);

// widget3.bind(SC.Widget.Events.READY, function () {
//   console.log("Yjefnifr")

//   widget3.getVolume(function (volume) {
//     console.log('current volume value is ' + volume);
//   });

//   widget3.setVolume(100);


// });

// var widgetIframe4 = document.getElementById('sc-widget4'),
//   widget4 = SC.Widget(widgetIframe4);

// widget4.bind(SC.Widget.Events.READY, function () {
//   console.log("Yjefnifr")

//   widget4.getVolume(function (volume) {
//     console.log('current volume value is ' + volume);
//   });

//   widget4.setVolume(100);


// });



// let track1counter = 0
// let track2counter = 0

let currentTrack

function playSound() {

  console.log(this.id)



var trackNumber = this.id;
var numberPattern = /\d+/g;
trackNumber = trackNumber.match( numberPattern ).join([]);
trackNumber = parseInt(trackNumber)

if (currentTrack === undefined) {
  currentTrack = trackNumber
} 


// alert(trackNumber);
  
  // document.getElementById("sc-widget").src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/522685110&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
  // widget.seekTo(0)
  if(window[`track${trackNumber}counter`] === 0) {
    
    window[`widget${trackNumber}`].play();
    document.getElementById(`playAndPauseIcon${trackNumber}`).classList.remove("fa-play");
    document.getElementById(`playAndPauseIcon${trackNumber}`).classList.add("fa-pause")
    if(currentTrack !== trackNumber) {
      document.getElementById(`playAndPauseIcon${currentTrack}`).classList.remove("fa-pause");
      document.getElementById(`playAndPauseIcon${currentTrack}`).classList.add("fa-play")
      window[`track${currentTrack}counter`] = 0
      window[`widget${trackNumber}`].seekTo(0)
    }
    
    window[`track${trackNumber}counter`] = 1
  }

  else {
    console.log("else")
    window[`widget${trackNumber}`].pause()
    
    document.getElementById(`playAndPauseIcon${trackNumber}`).classList.remove("fa-pause");
    document.getElementById(`playAndPauseIcon${trackNumber}`).classList.add("fa-play")
    window[`track${trackNumber}counter`] = 0

  }
  currentTrack = trackNumber
}

// function playSound2() {
  
//   // document.getElementById("sc-widget").src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/522685110&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
  
//   if(track2counter === 0) {

    

//     widget2.play()
//     document.getElementById("playAndPauseIcon2").classList.remove("fa-play")
//     document.getElementById("playAndPauseIcon2").classList.add("fa-pause")
//     track2counter = 1
//   } else {
//     widget2.pause()
//     document.getElementById("playAndPauseIcon2").classList.remove("fa-pause")
//     document.getElementById("playAndPauseIcon2").classList.add("fa-play")
//     track2counter = 0
//   }

// }
// document.getElementById("playAndPauseIcon1").addEventListener("click", playSound)
// document.getElementById("playAndPauseIcon2").addEventListener("click", playSound2)
//  document.getElementById("soundcloud").addEventListener("load", playSound);

let tracks = document.getElementsByClassName("playAndPauseIcon")
let soundcloudWidget
for (let i = 0; i < tracks.length; i++) {
  window[`track${i + 1}`] = tracks[i]
  window[`track${i + 1}counter`] = 0;
  // window[`widgetIframe${i+1}`]
  soundcloudWidget  = document.getElementById(`sc-widget${i+1}`)
  window[`widget${i+1}`] = SC.Widget(soundcloudWidget);
  console.log(soundcloudWidget)

  window[`widget${i+1}`].bind(SC.Widget.Events.READY, function () {
  console.log("Yjefnifr")

  // widget1.getVolume(function (volume) {
  //   console.log('current volume value is ' + volume);
  // });

  // widget1.setVolume(100);


});

  
  
  window[`track${i + 1}`].addEventListener("click", playSound)

}

});
