class Inter extends Game {
	constructor(n) {
		super(n); 
		this.gameCard = this.deck.pickOneCard();
		this.serve(4);
		if (cardValue(this.gameCard) == "j") {
			this.gamePip = null;  
			this.cardFromDeck(5);
		} else {
			this.gamePip = cardPip(this.gameCard);
			if (cardValue(this.gameCard) == "A") {
				Game.nextTurn(); 
			} else if (cardValue(this.gameCard) == "2") {
				this.cardFromDeck(2);
			} else if (cardValue(this.gameCard) == "10") {
				this.cardFromDeck(4);
			} else if (cardValue(this.gameCard) == "8") {
				console.log("changed game");
				return new Inter(n);
			}
		}  

	}

	playOneCard(cardIndex) {
		let card = this.player[this.turn].hand[cardIndex];
		if (cardValue(this.gameCard) == cardValue(card) || cardPip(card) == cardPip(this.gameCard) || cardValue(card) == "8" || cardValue(card) == "j") {
			this.player[this.turn].play(cardIndex);
		} else {
			console.log("Le motif de votre carte ne correspond pas avec la carte de jeux");
		}
	}

	playIdenticCards(cardsIndex, gameCard) {
		// extract the cards from the hand
		let cards=[];
		let newHand = [...this.player[this.turn].hand];
		for (var i = 0; i < cardsIndex.length; i++) {
			if (typeof this.player[this.turn].hand[cardsIndex[i]] !== "Undefined") {
				cards.push(this.player[this.turn].hand[cardsIndex[i]]);
				newHand.splice(cardsIndex[i], 1); 
			}
		}

		if (cardValue(gameCard) == cardValue(cards[0]) || cardPip(cards[0]) == cardPip(gameCard) || cardValue(cards[0]) == "8" || cardValue(cards[0]) == "j") {
			// one card or multiple cards
			if (cardsIndex.length > 1) {
				let number = cards.length;
				let finalCard = cards[0];
				let state; 
				// find the card on top 
				for (var i = 1; i < number; i++) {
					// check if les carte sont identiques
					if (cardValue(cards[i]) == cardValue(cards[0])) {
						finalCard = cards[i];
						state = true;
					} else {
						console.log("Vous ne pouvez jouer pas jouer deux cartes à la fois à moins qu'il soient identiques");
						state = false; 
						break;
					}
				}
				if (state == true) {
					this.player[this.turn].hand = [...newHand]; 
					this.player[this.turn].nCards = this.player[this.turn].hand.length;
					return finalCard;
				}
				 
			} else if (cardsIndex.length == 1) {
				this.player[this.turn].play(cardsIndex);
			}

		} else {
			console.log("Le motif de votre carte ne correspond pas avec la carte de jeux");
		}
	}

	playInter(playedCard) {
		if (cardValue(this.gameCard) == "8") {
			//code pour Inter 
			if (this.asked == null || typeof this.asked === "undefined") {
				this.asked = cardValue(playedCard[0]);
				console.log("Inter demande " + this.asked);
				this.nextTurn();
			} else {
				if (cardValue(playedCard[0]) == this.asked) {
					this.asked = null; 
					this.turnPlay(playedCard);
					 
				} else if (cardValue(playedCard[0]) == "8") {
					this.asked = null;
					this.turnPlay(playedCard);
					
				} else if (cardValue(playedCard[0]) == "j") {
					this.asked = null;
					this.turnPlay(playedCard);
					
				} else {
					console.log("Inter demande " + this.asked);
				}
			}
			
		} else {
			this.turnPlay(playedCard);
		}
	}

	turnPlay(playedCard) {
		if (cardValue(playedCard[0]) == "j") {
			//code pour le joker 
			this.gameCard = playedCard[0];
			this.gamePip = null;  
			this.checkEnd();
			this.cardFromDeck(5);
		} else if (cardValue(playedCard[0]) == "8") {
			//code pour Inter 
			this.gameCard = playedCard[0];
			this.gamePip = null;
			
		} else {
			if (cardPip(playedCard[0]) == this.gamePip || this.gamePip == null) {
				this.gameCard = playedCard[0]; 
				if (cardValue(playedCard[0]) == "A") {
					for (var i = 2 - 1; i >= 0; i--) {
						this.checkEnd();
					}
				} else if (cardValue(playedCard[0]) == "2") {
					this.checkEnd();
					this.cardFromDeck(2);
				} else if (cardValue(playedCard[0]) == "10") {
					this.checkEnd();
					this.cardFromDeck(4);
				} else {
					this.checkEnd();  
				}
				this.gamePip = cardPip(this.gameCard);
				
			} else if(cardValue(playedCard[0]) == cardValue(this.gameCard)) {
				this.gameCard = playedCard[0]; 
				this.gamePip = cardPip(this.gameCard);
				this.checkEnd();
			} 
		}
		
		console.log(this);
		console.log(this.player[this.turn].hand);

	}

	cardFromDeck(n) {
		this.player[this.turn].receive(this.deck.pickNCards(n));
		this.cardNbr = this.deck.length; 
		this.nextTurn(); 
	}

	checkEnd() {
		if (this.player[this.turn].Ncars == 1) {
			console.log("Le joueur " + this.turn + " toque");
			this.nextTurn();
		} else if (this.player[this.turn].Ncars == 0) {
			console.log("Ce joueur sort de la parti");
			this.player.splice(player, 1);
			if (this.player.length == 1) {
				console.log("Fin de la partie");
			} else {
				if (typeof this.player[this.turn] == "undefined") {
					this.turn = 0;
				}
			}
			
		} else {
			this.nextTurn();
		}
	}

}