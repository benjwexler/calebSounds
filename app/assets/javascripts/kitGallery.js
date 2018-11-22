

let kitsObj = {
    kit1: {}
}

for (let i = 1; i < 17; i++) {
    kitsObj.kit1[`sound${i}`] = `I am ${i}`
}

console.log(kitsObj)

for (let i = 1; i < 3; i++) {
    console.log(kitsObj.kit1[`sound${i}`])
}

document.addEventListener("DOMContentLoaded", function () {

let galleryImages = document.getElementsByClassName("galleryImage")

let startPosition = 0

let stop = galleryImages.length

let highLightedPick = galleryImages[1].parentElement


function soundPackImage() {
    document.getElementById("soundPackImage").src = this.src 
    console.log(this.parentElement)
    this.parentElement.style.opacity="1"
    highLightedPick.style.opacity=".6"
    

    highLightedPick = this.parentElement

}


// constructor for linked list
function LinkedList() {
    this.head = null;
    this.tail = null;
}

// constructor for new node being added
function Node(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
}

LinkedList.prototype.addToHead = function (value) {
    const newNode = new Node(value, this.head, null);  
    if (this.head) this.head.prev = newNode; //if
    else this.tail = newNode;
    this.head = newNode;
};

LinkedList.prototype.addToTail = function (value) {
    const newNode = new Node(value, null, this.tail);
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;
    this.tail = newNode;
}

const list = new LinkedList();





let coverArtArr = [
    "pics/beatTape18Caleb.jpg", "pics/c'estYesCoverArt.jpg", "pics/kermitCoverArt.jpg", "pics/tributeCoverArtCalb.jpg", "pics/calebStoicRedLight.jpg", "pics/beatTape18Caleb.jpg", "pics/c'estYesCoverArt.jpg", "pics/kermitCoverArt.jpg", "pics/tributeCoverArtCalb.jpg", "pics/guitarLogo.png"
]

for (let i = 0; i < coverArtArr.length; i++) {
    list.addToTail(coverArtArr[i]);
}

list.head.prev = list.tail
list.tail.next = list.head

let currentNode = list.head
let tempCurrentNode = currentNode

let counter = 0

for (let i = 0; i < 5; i++) {
    galleryImages[i].addEventListener("click", soundPackImage)
    
    galleryImages[i].src = currentNode.value
    currentNode = currentNode.next

}

function nextPic() {
    console.log(this.id)
    if(this.id !=="nextBtn") {
        currentNode = tempCurrentNode.next
    } else {
        currentNode = tempCurrentNode.prev
    }
    
    tempCurrentNode = currentNode
    for (let i = 0; i < 5; i++) {
        galleryImages[i].src = currentNode.value
        currentNode = currentNode.next
    }
}


// localStorage.list = list

// localStorage.setItem('list', list);

// var stringify = require('json-stringify-safe');

// var circularObj = {};
// list.circularRef = list;
// list.list = [ list, list ];
// console.log(stringify(list, null, 2));

// JSON.stringify(list)

// localStorage.setItem('list', JSON.stringify(list));
// var localStorageList = JSON.parse(localStorage.getItem('list'));

// console.log(localStorageList)

document.getElementById("nextBtn").addEventListener("click", nextPic)
document.getElementById("prevBtn").addEventListener("click", nextPic)

// 'use strict';

// var CircularJSON = window.CircularJSON
//   , obj = { foo: 'bar' }
//   , str
//   ;
  
// obj.self = obj;
// str = CircularJSON.stringify(obj);

});