let kopo = new Kopo(2);
    console.log(kopo);
    showCards();
    turnManager();
function restartGame() {
    window.location.replace("app.html");
}
function quitGame() {
    window.location.replace("index.html");
}
document.querySelector("#rejouer").addEventListener("click", restartGame);
