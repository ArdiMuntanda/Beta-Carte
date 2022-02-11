let kopo = new Kopo(2);
console.log(kopo);
showCards();
detectPlay();
function detectPlay() {
	let playingCard = document.querySelectorAll(".hand_block.my div");
	playingCard.forEach(card => {
		card.addEventListener("click", function (e) {
            console.log("okay");
            if (kopo.turn == 0) {
                kopo.turnPlay(kopo.player[0].play(card.getAttribute("position")));
                showCards();
                detectPlay();
            } else {
                console.error("Attendez votre tour pour jouer !");
            }
		});
	});
}