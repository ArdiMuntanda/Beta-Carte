let kopo; 
document.querySelector("#kevin_person").addEventListener('click', function (e) {
    console.log("okay");
    document.querySelector('.player_block').textContent = "Kevin";
    document.querySelector('.player_block').style.backgroundColor = "#3362E8";
    document.querySelector('#choose_opponent').style.display = "none";

    kopo = new Kopo(2);
    console.log(kopo);
    showCards();
    document.getElementById("game_melody").play();
    turnManager();
    
});
document.querySelector("#maria_person").addEventListener('click', function (e) {
    console.log("okay");
    document.querySelector('.player_block').textContent = "Maria";    
    document.querySelector('.player_block').style.backgroundColor = "#F8AE19";
    document.querySelector('#choose_opponent').style.display = "none";
    kopo = new Kopo(2);
    console.log(kopo);
    showCards();
    document.getElementById("game_melody").play();
    turnManager();
});

function restartGame() {
    window.location.replace("app.html");
}
function quitGame() {
    window.location.replace("index.html");
}
document.querySelector("#rejouer").addEventListener("click", restartGame);
