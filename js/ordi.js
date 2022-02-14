function ordiPlay() {
    if (kopo.gameCard != null) {
        let gamePip = cardPip(kopo.gameCard);
        let positions = [];

        for (let i = 0; i < kopo.player[1].hand.length; i++) {
            if (cardPip(kopo.player[1].hand[i]) == gamePip) {
                positions.push(i);
            }
        }

        if (positions.length == 0) {
            kopo.pickGameCard();
            console.log(document.getElementById("my_turn"));
            document.querySelector(".my_turn").click();
        } else if (positions.length == 1) {
            if (parseInt(cardValue(kopo.player[1].hand[0])) < parseInt(cardValue(kopo.gameCard))) {
                console.log("1 <");
                kopo.turnPlay([positions[0]]);
                console.log(document.querySelector(".my_turn"));
                document.querySelector(".my_turn").click();
            } else {
                console.log("1 >");
                kopo.turnPlay([positions[0]]);
                setTimeout(ordiPlay, 3000);
            }
        } else if (positions.length > 1) {
            let toPlay = positions[0];
            for (let e = 1; e < positions.length; e++) {
                if (cardValue(kopo.player[1].hand[toPlay]) < cardValue(kopo.player[1].hand[positions[e]])) {
                    toPlay = positions[e];
                }
            }
            console.log("l'ordi joue: " + kopo.player[1].hand[toPlay]);

            if (parseInt(cardValue(kopo.player[1].hand[parseInt(toPlay)])) < parseInt(cardValue(kopo.gameCard))) {
                console.log("+ <");
                kopo.turnPlay([parseInt(toPlay)]);
                console.log(document.getElementById("my_turn"));
                document.querySelector(".my_turn").click();
            } else {
                console.log("+ >");
                kopo.turnPlay([parseInt(toPlay)]);
                setTimeout(ordiPlay, 3000);
            }
        }


    } else if (kopo.gameCard == null && kopo.gameMaster == 1) {
        // play randomly
        kopo.turnPlay([getHigherCard(kopo.player[1].hand)[1]]);
        document.querySelector(".my_turn").click();
    }
    showCards();
}