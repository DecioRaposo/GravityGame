//Game Control
var character = document.getElementById("character");
var game = document.getElementById("game");
var setInterval;
var stepLeftRightValue = 0;
var counter = 0; //Counter keep tracks of how many times this interval gaps runs
var currentBar = []; //currentBar to keep track how many bars are on the screen
//Ball move to the left
function moveLeft() {
    var left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    if (left > 0) {
        character.style.left = left - 7 + "px";
    }
}
//Ball move to the Right
function moveRight() {
    var left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    if (left < 630) {
        character.style.left = left + 7 + "px";
    }
}
document.addEventListener("keydown", (event) => {
    if (stepLeftRightValue == 0) {
        stepLeftRightValue++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", (event) => {
    clearInterval();
    stepLeftRightValue = 0;
});
//bar & gap
//setInterval for creating bars and gaps over and over again
var bars = setInterval(function () {
    //barLast, barLastTop, gapLast and gapLastTop separate the bars and gaps so they don"t create on top of each other
    var barLast = document.getElementById("bar" + (counter - 1));
    var gapLast = document.getElementById("gap" + (counter - 1));

    if (counter > 0) {
        var barLastTop = parseInt(
            window.getComputedStyle(barLast).getPropertyValue("top")
        );
        var gapLastTop = parseInt(
            window.getComputedStyle(gapLast).getPropertyValue("top")
        );
    }
    if (barLastTop < 550 || counter == 0) {
        //if(barLastTop) to make the bars & gaps fit inside the game whiteout scrollbars
        var bar = document.createElement("div");
        var gap = document.createElement("div");
        bar.setAttribute("class", "bar");
        gap.setAttribute("class", "gap");
        bar.setAttribute("id", "bar" + counter);
        gap.setAttribute("id", "gap" + counter);
        bar.style.top = barLastTop + 80 + "px";
        gap.style.top = gapLastTop + 80 + "px";
        var random = Math.floor(Math.random() * 580); //Making the gap random
        gap.style.left = random + "px";
        game.appendChild(bar);
        game.appendChild(gap);
        currentBar.push(counter);
        counter++;
    }
    var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    var characterLeft = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    var drop = 0;
    //Game Over
    if (characterTop <= 0) {
        alert("Game Over!! Score: " + (counter - 9));
        clearInterval(bars);
        location.reload();
    }
    for (var i = 0; i < currentBar.length; i++) {
        let current = currentBar[i];
        let ibar = document.getElementById("bar" + current);
        let igap = document.getElementById("gap" + current);
        let ibarTop = parseFloat(
            window.getComputedStyle(ibar).getPropertyValue("top")
        );
        let igapLeft = parseFloat(
            window.getComputedStyle(igap).getPropertyValue("left")
        );
        ibar.style.top = ibarTop - 2 + "px";
        igap.style.top = ibarTop - 2 + "px";
        //Trying to make it run smooth by removing the bars and gaps from the html
        if (ibarTop < - 20) {
            currentBar.shift();
            ibar.remove();
            igap.remove();
        }
        if (ibarTop - 20 < characterTop && ibarTop > characterTop) {
            drop++;
            if (igapLeft <= characterLeft && igapLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    if (drop == 0) {
        //So the ball don"t drop bellow the bottom of the game
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 2 + "px";
    }
}, 1);
