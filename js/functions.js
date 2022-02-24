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

function showCards() {
	let handBlock = document.querySelector(".hand_block.my");
	let cardList = kopo.player[0].hand;
	let cardImg;
	handBlock.innerHTML = "";
	//Show the player cards
	for (let i = 0; i < cardList.length; i++) {
		cardImg = document.createElement("div");
		cardImg.className = "my_card";
		cardImg.id = cardList[i];
		cardImg.style.background = "url('cartes/"+cardList[i]+".svg') bottom center no-repeat";
		cardImg.setAttribute("position", i);
		handBlock.appendChild(cardImg);
	}

	//Show the opponent cards
	handBlock = document.querySelector(".hand_block.opponent");
	cardList = kopo.player[1].hand;
	handBlock.innerHTML = "";
	for (i = 0; i < cardList.length; i++) {
		cardImg = document.createElement("div");
		cardImg.className = "opponent_card";
		cardImg.id = cardList[i];
		cardImg.style.background = "url('cartes/back.svg') bottom center no-repeat contain";
		cardImg.setAttribute("position", i);
		handBlock.appendChild(cardImg);
	}

	//Show table cards 
	if (kopo.gameCard != null) {
		
		console.log(kopo.gameCard);
	   let table = document.querySelector(".table");
	   table.innerHTML = "";
	   let gameCard = document.createElement("div");
	   gameCard.style.background = "url('cartes/"+kopo.gameCard+".svg') bottom center no-repeat";
	   gameCard.style.backgroundSize = "contain";
	   gameCard.className = "game_card";
	   gameCard.style.width = "18%";
	   gameCard.style.height = "110px";
   
	   table.appendChild(gameCard);
	}
}

function detectPlay() {
	console.log('detect play had been launch');
	let playingCard = document.querySelectorAll(".hand_block.my .my_card");
	playingCard.forEach(cardImg => {
		cardImg.addEventListener("click", function (e) {
            if (kopo.turn == 0) {
				console.log('click detected');
                kopo.turnPlay([parseInt(cardImg.getAttribute("position"))]);
                showCards();
				turnManager();
            } else {
                console.error("Attendez votre tour pour jouer !");
            }
		});
	});
	if (document.querySelector(".game_card") != null) {
		document.querySelector(".game_card").addEventListener("click", function (e){
			if (kopo.turn == 0) {
				console.log('click detected');
				kopo.pickGameCard();
				showCards();
				turnManager();
			} else {
				console.error("Attendez votre tour pour jouer !");
			}
		});
	}
	return true;
}

function getHigherCard (hand) {
	console.log("passed hand: " + hand);
	let higher = hand[0];
	let toReturn;
	for (let e = 1; e < hand.length; e++) {
		if (parseInt(cardValue(higher)) < parseInt(cardValue(hand[e]))) {
			toReturn = hand[e];
		}
	}
	console.log(toReturn);
	return [toReturn, hand.indexOf(toReturn)];
}

function turnTick() {
	if (kopo.turn == 0) {
		document.querySelector(".my_zone").classList.add("turn");
		document.querySelector(".opponent_zone").classList.remove("turn");
	} else {
		document.querySelector(".opponent_zone").classList.add("turn");
		document.querySelector(".my_zone").classList.remove("turn");
	}
}

function wipeTable() {
	if (kopo.gameCard == null) {
		document.querySelector(".table").innerHTML = "";
	}
}

// turn management
function turnManager () {
    if (kopo.turn == 0) {
        detectPlay();
		turnTick();
        wipeTable();
    } else if (kopo.turn == 1) {
        turnTick();
        setTimeout(ordiPlay, 3000);
        wipeTable();
    }
}