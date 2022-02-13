let kopo = new Kopo(2);
console.log(kopo);
showCards();
detectPlay();
turnTick()
// turn management
document.querySelectorAll(".turn").forEach(element => {
    element.addEventListener("change", function (e) {
        if (kopo.turn == 0) {
            turnTick()
            detectPlay();
            wipeTable();
        } else if (kopo.turn == 1) {
            turnTick();
            setTimeout(ordiPlay, 3000);
            wipeTable();
            document.getElementById("my_turn").click();
        }
    });
});


