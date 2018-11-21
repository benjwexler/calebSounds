let newFiles = []; 

// document.addEventListener("DOMContentLoaded", function () {

console.log("Hey")

var input = document.getElementById("kit_folder");

console.log(input)
// var output = document.getElementById('output');

var AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();
console.log(context);

var gainNode = context.createGain();

function playSound(number, soundFile) {

    // window[`bufferNode${number}`]
    // let bufferNodeName = window[`bufferNode${number}`]

    window[`bufferNode${number}`] = context.createBufferSource();

    var request = new XMLHttpRequest();
    request.open('GET', soundFile, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        context.decodeAudioData(
            request.response,
            function (buffer) {
                window[`bufferNode${number}`].buffer = buffer;
                window[`bufferNode${number}`].connect(gainNode);
                gainNode.connect(context.destination);
                gainNode.gain.setValueAtTime(1, context.currentTime);
            },
            function (e) { console.log("Error with decoding audio data" + e.err); }
        );
    };
    request.send()
    window[`bufferNode${number}`].start()
};

// input.onchange = function(e) {




//     // for(let index = 0; index < inputFile[0].files.length; index++) {
//     //   let file = inputFile[0].files[index];
//     //   newFiles.push(file);
//     //   files.push(file);
//     // }

// //   var files = e.target.files; // FileList
// //     for (var i = 0, f; f = files[i]; ++i){
// //         // console.debug(files[i].webkitRelativePath);
// //         console.log(files[i].webkitRelativePath+"\n")
// //         document.getElementById("kit_sounds_attributes_1_soundfile").value = files[i]
// //         console.log(files[i])
// //         // playSound(1,files[i])
// //         // output.innerText  = output.innerText + files[i].webkitRelativePath+"\n";
// //     }
// // }

// });
 
// document.addEventListener("turbolinks:load", changeValue)
// document.addEventListener("turbolinks:load", listener)


// function changeValue() {
//     document.getElementById("kit_id").value = document.getElementById("whichKit").value
    
// }

// function listener() {
//     document.getElementById("whichKit").addEventListener("input", changeValue);
// }



