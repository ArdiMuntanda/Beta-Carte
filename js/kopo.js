// Deck seulement avec les cartes de chiffre 
class Deck {
	constructor() {
		this.cards = [
			"2h",
			"3h",
			"4h", 
			"5h",
			"6h",
			"7h",
			"8h",
			"9h", 
			"10h",
			"2d",
			"3d",
			"4d", 
			"5d",
			"6d",
			"7d",
			"8d",
			"9d", 
			"10d",
			"2s",
			"3s",
			"4s", 
			"5s",
			"6s",
			"7s",
			"8s",
			"9s", 
			"10s",
			"2c",
			"3c",
			"4c", 
			"5c",
			"6c",
			"7c",
			"8c",
			"9c", 
			"10c",
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

class Kopo extends Game {
	constructor(n) {
		super(n);
		this.deck.shuffle();
		this.serve(3);

		this.gameCard = null; //aucune carte sur la table 
		this.gameMaster = 0;  
	}

	turnPlay(cardIndex) {
		let card = this.player[this.turn].hand[cardIndex];// cette variable contient la carte que le joueur a décidé de jouer
		if(this.gameCard == null) { //si il n'y a aucune carte sur la table, 
			this.player[this.turn].play(cardIndex);// extrait la carte choisi de la main du joueur dont c'est le tour 
			this.gameCard = card;// ça carte va imposer la fleur aux autre 
			this.gameMaster= this.turn; 
			this.turnEnder = this.setTurnEnder(this.gameMaster);// une variable pour savoir quand sera le dernier à jouer sur cette carte imposée

			// Verifier si le joueur qui vient de jouer n'a pas jouer sa dernière carte, si c'est le cas il est qualifié
			if (this.player[this.turn].hand.length == 0) {
				this.player.splice(this.turn, 1);
				console.log("le joueur "+ this.turn + "est sorti du jeu");
				if (this.player.length == 1) { //si il ne restais plus que deux joueur en liste, le joueur sort et la la partie est fini
					console.log('Fin de la partie !');
				} else {
					this.nextTurn();
				}
			} else {
				this.nextTurn();
			}
		} else { // s'il ya déjà au moins une carte sur la table
		// verifier si la carte jouée a le même motif que la  carte du jeu
			if (cardPip(card) == cardPip(this.gameCard)) { 
				this.player[this.turn].play(cardIndex);//retirer cete carte de la main du joueur 
				if (parseInt(cardValue(card)) >= parseInt(cardValue(this.gameCard))) {
					// si elle est plus puissante que toutes les cartes sur la table, ce joueur devient le maitre du jeu
					this.gameCard = card;
					this.gameMaster= this.turn; 
				} 
				
				if (this.player[this.turn].hand.length == 0) { // verifier si le ce joueur ne vient pas de jouer sa dernière carte 
					this.player.splice(this.turn, 1);
					console.log("le joueur "+ this.turn + "est sorti du jeu");
					if (this.player.length == 1) {
						console.log('Fin de la partie !');
					} else {
						this.nextTurn();
					}
				} else { 
					if (this.turn == this.turnEnder) { // verifier si ce joueur est le dernier à jouer sur cette carte imposée
						// si c'est le cas le tour passe à la personne qui a jouée la carte la plus puissante sur la table 
						this.gameCard = null;
						this.turn = this.gameMaster;
					} else {
						// si ce n'est pas le cas le tour continue
						this.nextTurn();
					}
				}
				
			} else {
				console.log('Veuillez Jouer une carte du même motif que les cartes en jeu. si vous n\'en avez pas Veuillez prendre la plus forte carte du jeu dans votre main.');
			}
		}
	}

	pickGameCard() {
		// prendre la plus puissante sur la table et la donner au joueur dont c'est le tour 
		this.player[this.turn].receive(this.gameCard);
		this.gameCard = null; 
		this.turn = this.gameMaster;// donner le tour au propiétair de cette carte la plus puissante (maitre du jeu).
	}

	setTurnEnder(gameMaster) { // une  fonction pour savoir qui sera le dernier à jouer sur une nouvelle carte imposée par un maitre de jeu
		let last = gameMaster + this.player.length-1; //algorithme pour trouver le dernier joueur
		if (last <= this.player.length - 1) {
			return last; 
		} else {
			return last - this.player.length; 
		}
	}

	kataps(playerNo, pip) { // la fonction KATAPS
		let motif = cardPip(this.player[playerNo].hand[0]);//motif dela première carte du joueur passé en paramètre 
		if (pip == null || pip == motif) { // verifier si le kataps se passe au début du jeu lorsqu'il n'y a aucune carte imposée ou en plein milieu
			let katapsExist = false;//variable de verification de l'identicité des motifs des cartes 
			for (var i =  1; i < this.player[playerNo].hand.length; i++) { // parcours toutes les cartes de la main du joueur pour savoir si elle sont identiques
				if (motif == cardPip(this.player[playerNo].hand[i])) {
					katapsExist = true; 
				} else {
					katapsExist = false; 
					break; 
					// si le motif même d'une seule carte diffère on arrête tout 
				}
			}

			if (katapsExist == false) {
				console.log("Vos cartes ne sont pas identiques, vous ne pouvez pas sortir");
			} else {
				this.player.splice(playerNo, 1);
				console.log("Kataps !! le joueur "+ playerNo + "est sorti du jeu");
				this.gameCard = null; 
				this.gameMaster = null;

				if (this.player.length == 1) {
					console.log("Fin de la partie");
				} else {
					if (this.turn >= this.player.length) {
						this.turn = 0;
					} 
				}
				return true;   
			}
		} else {
			console.log("Vous ne pouvez pas sortir, vos carte n'ont pas le même motif que la carte du jeu");
			return false
		}
		

	}

}