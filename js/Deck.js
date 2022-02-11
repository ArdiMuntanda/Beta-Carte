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