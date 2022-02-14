let kopo = new Kopo(2);
console.log(kopo);
showCards();
detectPlay();
turnTick()
// turn management
document.body.addEventListener("change", function (e) {
        let target = e.target;
        console.log(target);
        if (target.id = "my_turn" && kopo.turn == 0) {
            turnTick();
            detectPlay();
            wipeTable();
        } else if (target.id = "ordi_turn" && kopo.turn == 1) {
            turnTick();
            setTimeout(ordiPlay, 3000);
            wipeTable();
            document.querySelector(".my_turn").click();
        }
});


