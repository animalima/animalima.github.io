//References
const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");
const paper6 = document.querySelector("#p6");
const paper7 = document.querySelector("#p7");
const paper8 = document.querySelector("#p8");
const paper9 = document.querySelector("#p9");

//Event listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//Logics
let currentLocation = 1;
let numOfPapers = 9;
let maxLocation = numOfPapers + 1;
let counter = 1;
let vexel_counter =1;
let tvexel_counter =1;


function openBook() { 
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-280px)";
    nextBtn.style.transform = "translateX(280px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning){
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }  
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation){
        switch(currentLocation){
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                break;
            case 4:
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4;
                break;
            case 5:
                paper5.classList.add("flipped");
                paper5.style.zIndex = 5;
                break;
            case 6:
                paper6.classList.add("flipped");
                paper6.style.zIndex = 6;
                break;
            case 7:
                paper7.classList.add("flipped");
                paper7.style.zIndex = 7;
                break;
            case 8:
                paper8.classList.add("flipped");
                paper8.style.zIndex = 8;
                let anos = document.getElementById("f9").style.overflow = "visible";
                break;
            case 9:
                paper9.classList.add("flipped");
                paper9.style.zIndex = 9;
                let ano = document.getElementById("f9").style.overflow = "hidden";
                closeBook();
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++; 
    }
}

function goPrevPage() {
    if(currentLocation > 1){
        switch(currentLocation){
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 9;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 8;
                break;
            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 7;
                break; 
            case 5:
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 6;
                break; 
            case 6:
                paper5.classList.remove("flipped");
                paper5.style.zIndex = 5;
                break;
            case 7:
                paper6.classList.remove("flipped");
                paper6.style.zIndex = 4;
                break; 
            case 8:
                paper7.classList.remove("flipped");
                paper7.style.zIndex = 3;
                break; 
            case 9:
                paper8.classList.remove("flipped");
                let anos = document.getElementById("f9").style.overflow = "hidden";
                paper8.style.zIndex = 2;
                break;
            case 10:
                openBook();
                paper9.classList.remove("flipped");
                let ano = document.getElementById("f9").style.overflow = "visible";
                paper9.style.zIndex = 1;
                break;
            default:
                throw new Error("unknown state");  
        }
        currentLocation--;
    }
}

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
},5000);

setInterval(function(){
    document.getElementById('vexel-radio' + vexel_counter).checked = true;
    vexel_counter++;
    if(vexel_counter > 3){
        vexel_counter = 1;
    }
},8000);

setInterval(function(){
    document.getElementById('tvexel-radio' + tvexel_counter).checked = true;
    tvexel_counter++;
    if(tvexel_counter > 3){
        tvexel_counter = 1;
    }
},8000);

//Puzzle
var rows = 3;
var columns = 3

var currTile;
var otherTile;

var turns = 0;
var imgOrder = ["./img/puzzle/4", 
                "./img/puzzle/2", 
                "./img/puzzle/8", 
                "./img/puzzle/5", 
                "./img/puzzle/1", 
                "./img/puzzle/6",
                "./img/puzzle/7",
                "./img/puzzle/9",
                "./img/puzzle/3"];

window.onload = function(){
    for (let r=0; r < rows; r++){
        for(let c = 0; c <columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            tile.classList = "r" + r + "c" + c;

            // Functions
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile = this;
}

function dragOver(e){
    e.preventDefault(); 
}

function dragEnter(e){
    e.preventDefault(); 
}

function dragLeave(){
    // e.preventDeafault(); 
}

function dragDrop(){
    otherTile = this;
}

function dragEnd(){
    if(!otherTile.src.includes("3.jpg")){
        return;
    }
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
    
        currTile.src = otherImg;
        otherTile.src = currImg; 

        turns +=1;
        document.getElementById("turns").innerText = turns;
    }
    console.log(otherTile.src)
}

// var imgCompleteOrder = ["./img/puzzle/1", 
//                         "./img/puzzle/2", 
//                         "./img/puzzle/3", 
//                         "./img/puzzle/4", 
//                         "./img/puzzle/5", 
//                         "./img/puzzle/6",
//                         "./img/puzzle/7",
//                         "./img/puzzle/8",
//                         "./img/puzzle/9"];

