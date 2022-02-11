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
		let newHand = []; 
		for (var i = 0; i < this.hand.length; i++) {
			if (cardsIndex.indexOf(i) == -1) {
				newHand.push(this.hand[i]);
			} else {
				cards.push(this.hand[i]);
			}
		}
		
		this.hand = [...newHand]; 
		this.nCards = this.hand.length; 
		
		return cards; 
	}
}

