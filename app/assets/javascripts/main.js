// function latestReleasesScroll() {
//     window.scrollBy(0, 840);


// }

document.addEventListener("DOMContentLoaded", function () {
const latestReleasesLink = document.getElementById("latestReleasesLink")
console.log("hey")

// latestReleasesLink.addEventListener("click", latestReleasesScroll)

function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

document.querySelector('#latestReleasesLink').addEventListener('click', () => scrollIt(document.getElementById("section2")));

document.querySelector('#drumMachineLink').addEventListener('click', () => scrollIt(document.getElementById("drumMachineSection")));
 
// function padDown() {
//   console.log(this.id)
//   let pad = this.id
//   pad = document.getElementById(pad)
//   pad.classList.add("padDown")


//   setTimeout(function(){ 
//     pad.classList.remove("padDown")
//   }, 80);

//   counterObj[`newPadCounter${this.id}`]++
// }

// let pads = document.getElementsByClassName("pad")

// let counterObj = {	
// };

// for(var i=1; i<=16; i++) {
//     counterObj[`newPadCounterpad${i}`] = 0;
// }

// function increasePadCounter() {
    
// }

// for(let i=0; i<pads.length; i++)  {
//   pads[i].id = `pad${i+1}`
//   pads[i].addEventListener('click', padDown)
//   counterObj['newPadCounter'+(i+1)] = 0;
// }



});
