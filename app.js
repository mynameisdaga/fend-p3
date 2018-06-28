

//definition of variables

let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"]
let shuffled = shuffle(cards);
const board = document.querySelector(".deck");
let stored = [];
let matched = [];
let moves = 0;
const movesNewValue = document.querySelector(".moves");
let popup = document.querySelector(".win");
let firstClicked = true;

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//function starting a new game

function letsStart(){
	//set stars to three by default
	document.querySelector(".one").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".two").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".three").innerHTML = '<i class="fa fa-star">';
	popup.style.display = "none";
	


//creating card class and appending it to the deck

for (let i = 0; i < shuffled.length; i++) {
	const tile = document.createElement("li");
	tile.classList.add("card");
	tile.innerHTML = `<i class = "${shuffled[i]}"></i>`;
	board.appendChild(tile);

//setting click event on cards

tile.addEventListener("click", function() {
	
		let tile2 = this;
		let tile1 = stored[0];
		

	if (firstClicked) {
		beginTiming(); 
		firstClicked = false;
	}
//flipping cards

	if(stored.length === 1) { 
		
		
		tile.classList.add("open", "show","disable");
		stored.push(tile2);
		if (tile2.innerHTML === tile1.innerHTML) {
					tile2.classList.add("match"); //matched cards
					tile1.classList.add("match");
					matched.push(tile2, tile1);
					

					stored=[];
		
				} else {

					//flipping cards back when no match

					function noMatch() {
					tile2.classList.remove("open", "show", "disable");
					tile1.classList.remove("open", "show", "disable");
					stored=[];
					}

					setTimeout(noMatch, 500); //timeOut setting to keep cards open for an half of a sec
					
					
				}
				increasingMoves();

	} else {
		tile2.classList.add("open", "show", "disable");
		stored.push(tile2);
	}
	modal();
});

}

// moves increasing when two next cards clicked 

function increasingMoves() {
	moves++;
	movesNewValue.innerHTML = moves;
	rating();
	}

}




letsStart();




//restart function 

const onceAgain  = document.querySelector(".restart");
onceAgain.addEventListener("click", function() {
	board.innerHTML = ""; 
	shuffled=shuffle(cards);
	const time = document.querySelector("#timer");
	stopTiming();
	time.innerHTML = "0 hours:0 minutes:0 seconds";
	matched = [];
	stored = [];
	moves = 0 ;
	movesNewValue.innerHTML = moves;
	
	document.querySelector(".one").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".two").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".three").innerHTML = '<i class="fa fa-star">';
	popup.style.display = "none";
	letsStart();// replaced from above stopTiming();
}); 

// modal pop-up

const click = document.getElementById("play-again");
function modal(){
	if (matched.length === 16){
		document.getElementById("final-moves").innerHTML = moves;
    	document.getElementById("final-time").innerHTML = timer.innerHTML;
		popup.style.display = "block";
		stopTiming();
	} 
}

// closing modal window when 

click.addEventListener("click", function() {
	board.innerHTML = ""; 
	shuffled=shuffle(cards);
	const time = document.querySelector("#timer");
	time.innerHTML = "0 hours:0 minutes:0 seconds";
	
	letsStart();
	
	
	matched = [];
	moves = 0 ;
	movesNewValue.innerHTML = moves;
	document.querySelector(".one").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".two").innerHTML = '<i class="fa fa-star">';
	document.querySelector(".three").innerHTML = '<i class="fa fa-star">';
	popup.style.display = "none";
});

// rating function

function rating() {


	if ( moves > 9 && moves < 16 ) {
		document.querySelector(".one").innerHTML = '<i class="fa fa-star-o">';
			} 
	 if (moves >= 16){
		document.querySelector(".one").innerHTML = '<i class="fa fa-star-o">';
		document.querySelector(".two").innerHTML = '<i class="fa fa-star-o">';
	}
}

 
// timer function 
let sec = 0;
let min = 0;
let hour = 0;
let interval;
const time = document.querySelector("#timer");

function beginTiming(){
	interval = setInterval(timing, 1000);
}
		
function timing (){
	time.innerHTML = hour + "h:" + min + "mins:" + sec + "s";
	sec ++;
		if (sec === 60){
			sec = 0;
			min ++;
		}
		if (min === 60){
			sec = 0;
			min = 0;
			hour++;
		}
}
 
function stopTiming() {
 	clearInterval(interval);
 	firstClicked = true;
 	sec = 0;
	min = 0;
	hour = 0;
}

