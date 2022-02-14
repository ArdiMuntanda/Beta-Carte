let kopo = new Kopo(2);
console.log(kopo);
showCards();
detectPlay();
turnTick()
// turn management
document.querySelector(".turn_tracker").addEventListener("change", function (e) {
        let target = e.target;
        console.log(target);
        if (target.value == 0 && kopo.turn == 0) {
            turnTick();
            detectPlay();
            wipeTable();
        } else if (target.value == 1 && kopo.turn == 1) {
            turnTick();
            setTimeout(ordiPlay, 3000);
            wipeTable();
            document.querySelector(".turn_tracker").value = 0;        
        }
});

function turnManager () {
    if (kopo.turn == 0) {
        turnTick();
        detectPlay();
        wipeTable();
    } else if (kopo.turn == 1) {
        turnTick();
        setTimeout(ordiPlay, 3000);
        wipeTable();
    }
}
