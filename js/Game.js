
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

	serve(nCards) {
		for (var i = 0; i < this.player.length; i++) {
			this.player[i].receive(this.deck.pickNCards(nCards));
		}
	}

	nextTurn() {
		if (this.turn < this.player.length-1) {
			this.turn++;
		} else if(this.turn == this.player.length-1) {
			this.turn = 0;
		}
	}
}