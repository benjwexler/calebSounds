
document.addEventListener("DOMContentLoaded", function () {

let galleryImages = document.getElementsByClassName("galleryImage")


let highLightedPick = galleryImages[1].parentElement


function soundPackImage() {
    document.getElementById("soundPackImage").src = this.src 
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
    if (this.head) this.head.prev = newNode; 
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

for (let i = 0; i < 5; i++) {
    galleryImages[i].addEventListener("click", soundPackImage)
    
    galleryImages[i].src = currentNode.value
    currentNode = currentNode.next

}

function nextPic() {
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

document.getElementById("nextBtn").addEventListener("click", nextPic)
document.getElementById("prevBtn").addEventListener("click", nextPic)

});