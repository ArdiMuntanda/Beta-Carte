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
	console.log(cardList);
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
	console.log(cardList);
	handBlock.innerHTML = "";
	for (i = 0; i < cardList.length; i++) {
		cardImg = document.createElement("div");
		cardImg.className = "opponent_card";
		cardImg.id = cardList[i];
		cardImg.style.background = "url('cartes/back.svg') bottom center no-repeat contain";
		cardImg.setAttribute("position", i);
		handBlock.appendChild(cardImg);
	}

	//Show the game card
}