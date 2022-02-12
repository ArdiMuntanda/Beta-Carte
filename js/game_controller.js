let kopo = new Kopo(2);
console.log(kopo);
showCards();
detectPlay();
function detectPlay() {
	let playingCard = document.querySelectorAll(".hand_block.my div");
	playingCard.forEach(cardImg => {
		cardImg.addEventListener("click", function (e) {
            if (kopo.turn == 0) {
                kopo.turnPlay(parseInt(cardImg.getAttribute("position")));
                showCards();
                detectPlay();
            } else {
                console.error("Attendez votre tour pour jouer !");
            }
		});
	});
}
