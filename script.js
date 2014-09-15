$(document).ready(function() {

	//what does this do?- changes the card name to a value to use to compare against other numbers
	function convert_value_to_string(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?- It creates a new deck as an array- the first loop creates a 
	//suit to sort into, the second one loops 13 times adding one of
	//each card 1-13 and pushes a card object called "number"
	//into each suit- the number declared by the index + 1 (since index
	// starts at zero), and the
	//suite determined by where it was in the first loop
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do? It takes an array already created and declares a
	//new "copy" array.  The var "n" determines the number of cards still in
	//the deck and then starts a while loop.  The while loop- when n exists
	//(i.e. it's greater than zero- it's not falsy), then it creats a random 
	//number rounded down so it's an integer and multiplies it by the current
	//length of the deck- if i is there- then it pushes it to the copy- 
	// at the same time it desletes the original and goes back one in the index
	//because deleting a card moves all the others up in the index
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	
	var gameDeck = shuffle(deck);
	cards_player_1 = gameDeck.splice(0,26);
	cards_player_2 = gameDeck;
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2) {
		if (card1.number > card2.number){
			return "player one";
		}
		else if (card1.number < card2.number) {
			return "player two";
		}
		else {
			return false;
		}
	}
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var whoWon = war(cards_player_1[0],cards_player_2[0]);
		if (whoWon === "player one"){
			cards_player_1.push(cards_player_2[0], cards_player_1[0]);
		}
		else if(whoWon === "player two"){
			cards_player_2.push(cards_player_2[0], cards_player_1[0]);
		}
		else {
			alert("War!");
			debugger;
			var warArrPlay1 = [];
			var warArrPlay2 = [];
			
			var whoWon = war(cards_player_1[3], cards_player_2[3]);
				
				if (whoWon === "player one"){
					for (var i = 0; i<4; i++) {
					cards_player_1.push(cards_player_2[i],cards_player_1[i]);
					}
				}
				else if(whoWon === "player two"){
				for (var i = 0; i<4; i++) {
					cards_player_2.push(cards_player_2[i],cards_player_1[i]);
					}
				}
				else if (false) {
					alert("War!");
				}
			cards_player_1.splice(0,4);
			cards_player_2.splice(0,4);
			advance();
		}
		cards_player_1.splice(0,1);
		cards_player_2.splice(0,1);
		//this function (defined below) will continue to the next turn
		advance();
	}
	
	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	
	$(".btn").click(function() {
		play();
	});
});
