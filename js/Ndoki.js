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