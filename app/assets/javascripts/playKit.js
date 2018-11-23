let counterObj = {
};


document.addEventListener("DOMContentLoaded", function () {

console.log("WTF")

let pads = document.getElementsByClassName("pad")

for (let i = 0; i < pads.length; i++) {
    // window[`bufferNode${i + 1}`] = 5
    counterObj[`newPadCounterpad${i + 1}`] = 0;
    pads[i].id = `pad${i + 1}`
    pads[i].addEventListener("mousedown", padDown)
    counterObj['newPadCounter' + (i + 1)] = 0;
}


function padDown() {

    playAndStop(this.id)

    let pad = this
    pad.classList.add("padDown")

    setTimeout(function () {
        pad.classList.remove("padDown")
    }, 80);

}



let firstPlayCounter;

var AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();
console.log(context);


var gainNode = context.createGain();

function playSound(number) {

    window[`bufferNode${number}`]
    let bufferNodeName = window[`bufferNode${number}`]

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

function stopSound(number) {
    // window[`bufferNode${number}`]

    let bufferNodeName = window[`bufferNode${number}`]
    console.log("___________")
    console.log(bufferNodeName)
    console.log("___________")
    // debugger 
    bufferNodeName.stop(context.currentTime);
};

function playAndStop(pad) {

    var numberPattern = /\d+/g;
    let number = pad.match(numberPattern).join([]);
    firstPlayCounter = counterObj[`newPadCounter${pad}`]
    counterObj[`newPadCounter${pad}`]++
    bufferNodeName = number

    soundFile = "/kick yacob.wav"
    // soundFile = "Wex & Cred - I Got You (ft. MKHL).mp3"

    if (firstPlayCounter === 0) {
        playSound(bufferNodeName, soundFile);
    }
    else {
        stopSound(bufferNodeName);
        playSound(bufferNodeName, soundFile);
    }

};



});
