class Deck {
	constructor() {
		this.cards = [
			"Ah", 
			"2h",
			"3h",
			"4h", 
			"5h",
			"6h",
			"7h",
			"8h",
			"9h", 
			"10h",
			"Jh",
			"Kh",
			"Qh",
			"Ad", 
			"2d",
			"3d",
			"4d", 
			"5d",
			"6d",
			"7d",
			"8d",
			"9d", 
			"10d",
			"Jd",
			"Kd",
			"Qd",
			"As", 
			"2s",
			"3s",
			"4s", 
			"5s",
			"6s",
			"7s",
			"8s",
			"9s", 
			"10s",
			"Js",
			"Ks",
			"Qs",
			"Ac", 
			"2c",
			"3c",
			"4c", 
			"5c",
			"6c",
			"7c",
			"8c",
			"9c", 
			"10c",
			"Jc",
			"Kc",
			"Qc",
			"j1", 
			"j2"
		]; 
		this.cardsNbr = this.cards.length; 
	}
	
	shuffle() {
	  let currentIndex = this.cards.length,  randomIndex;

	  // While there remain elements to shuffle...
		  while (currentIndex != 0) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex--;

		    // And swap it with the current element.
		    [this.cards[currentIndex], this.cards[randomIndex]] = [
		      this.cards[randomIndex], this.cards[currentIndex]];
	    }
	}


	pickOneCard() {
		let card = this.cards.pop();
		this.cardsNbr = this.cards.length;  
		return card; 
	}

	pickNCards(n) {
		let pickedCards = []; 
		for (var i = n - 1; i >= 0; i--) {
			pickedCards[i] = this.pickOneCard();
		}
		return pickedCards;
	}
}

class Player {
	constructor() {
		this.hand = []; 
		this.nCards = this.hand.length; 
	}

	receive(cards) {
		this.hand= this.hand.concat(cards);
		this.nCards = this.hand.length; 
	}

	play(cardsIndex) {
		let cards=[];
		let newHand = [...this.hand];
		for (var i = 0; i < cardsIndex.length; i++) {
			if (typeof this.hand[cardsIndex[i]] !== "undefined") {
				cards.push(this.hand[cardsIndex[i]]);
				newHand.splice(cardsIndex[i], 1); 
			}
		}
		this.hand = [...newHand]; 
		this.nCards = this.hand.length; 
		
		return cards;
	}
}


class Game {
	constructor(n) {
		this.deck = new Deck();
		this.deck.shuffle();
		this.player = []; 
		for (var i = 0; i < n; i++) {
			this.player.push(new Player());
		}
		this.turn = 0;

	}

	nextTurn() {
		if (this.turn < this.player.length-1) {
			this.turn++;
		} else if(this.turn == this.player.length-1) {
			this.turn = 0;
		}
	}

	serve(nCards) {
		for (var i = 0; i < this.player.length; i++) {
			this.player[i].receive(this.deck.pickNCards(nCards));
		}
	}
}

function cardPip(card) {
	return card[card.length - 1];
}

function cardValue(card) {
	if (card.length == 2) {
		return card[0];
	} else if(card.length == 3) {
		return card[0] + card[1];
	}
}

class Ndoki extends Game {
	constructor(n) {
		super(n); 
		this.ndoki = this.deck.pickOneCard();
		this.distributor(n);
		for (var i = 0; i < this.player.length; i++) {
			this.checkIdenticCards(i);
		}

	}

	distributor(n) {
		while (this.deck.cardsNbr != 0) {
			for (var i = 0; i < n; i++) {
				if (this.deck.cardsNbr != 0) {
				this.player[i].receive(this.deck.pickOneCard());					
				} else {
					break; 
				}
			}
		}	
	}

	checkIdenticCards(player) {
		let hand = this.player[player].hand;
		for (var i = hand.length - 1; i >= 0; i--) {
			if (typeof hand[i] != "undefined") {
				let a = [...hand];
			 	let x = a.splice(i, 1);
			 	for (var e = 0; e < a.length; e++) {
			 		if (cardValue(a[e]) == cardValue(x[0])) {
			 			a.splice(e, 1);
			 			hand = [...a];
			 			console.log("J'ai retiré une paire de " + cardValue(x[0]));
			 			break; 
			 		} 
			 		
			 	}
			}  
			
		} 
		this.player[player].hand = [...hand];

		this.player[player].nCards = this.player[player].hand.length; 


	}

	turnPlay(index) {
		let next; 
		if (this.turn == this.player.length - 1) {
			next = 0;
			this.player[this.turn].receive(this.player[next].play(index));		
		} else {
			next = this.turn + 1;
			this.player[this.turn].receive(this.player[next].play(index));
		}
		if (this.checkFinishedPlayer(next) == true) {
			console.log("le prochain joueur est sorti du jeu !");
		} 

		this.checkIdenticCards(this.turn);
		let state = this.checkFinishedPlayer(this.turn);
		console.log(state);
		if (state == true) {
			if (this.player.length == 1) {
				console.log("Fin de la partie !");
				console.log("le ndoki de la partie est " + this.ndoki);
			} else {
				console.log("ce joueur est sorti du jeux!");
			}
		} else {
			this.nextTurn();
			console.log(this);
			console.log(this.player);

		}
		
	}

	checkFinishedPlayer(player) {
		if (this.player[player].nCards == 0) {
			this.player.splice(player, 1);
			return true;
			 
		} else {
			return false; 
		}
	}


}

let ndoki = new Ndoki(4);
console.log(ndoki);