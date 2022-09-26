//Game Control
var character = document.getElementById("character");
var game = document.getElementById("game");
var setInterval;
var both = 0;
//Counter keep tracks of how many times this interval holes runs
var counter = 0;
//currentBar to keep track how many bars are on the screen
var currentBar = [];
//Ball move to the left
function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 7 + "px";
    }
}
//Ball move to the Right
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 623) {
        character.style.left = left + 7 + "px";
    }
}
document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }

    }
});
document.addEventListener("keyup", event => {
    clearInterval();
    both = 0;
});
//bar & hole
//setInterval for creating bars and holes over and over again
var bars = setInterval(function () {
    //barLast, barLastTop, holeLast and holeLastTop separate the bars and holes so they don't create on top of each other
    var barLast = document.getElementById("bar" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var barLastTop = parseInt(window.getComputedStyle(barLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    //if(barLastTop) to make the bars & holes fit inside the game whiteout scrollbars 
    if (barLastTop < 550 || counter === 0) {
        var bar = document.createElement("div");
        var hole = document.createElement("div");
        bar.setAttribute("class", "bar");
        hole.setAttribute("class", "hole");
        bar.setAttribute("id", "bar" + counter);
        hole.setAttribute("id", "hole" + counter);
        bar.style.top = barLastTop + 70 + "px";
        hole.style.top = holeLastTop + 70 + "px";
        game.appendChild(bar);
        game.appendChild(hole);
        currentBar.push(counter);
        //Making the hole random//
        var random = Math.floor(Math.random() * 580);
        hole.style.left = random + "px";
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    //Game Over
    // if (characterTop <= 0) {
    //     alert("Game Over!! Score: "(counter - 9));
    //     clearInterval(bars);
    //     location.reload();
    //}
    for (var i = 0; i < currentBar.length; i++) {
        let current = currentBar[i];
        let ibar = document.getElementById("bar" + current);
        let ihole = document.getElementById("hole" + current);
        let ibarTop = parseFloat(window.getComputedStyle(ibar).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        ibar.style.top = ibarTop - 0.5 + "px";
        ihole.style.top = ibarTop - 0.5 + "px";
        //Trying to make it run smooth by removing the bars and holes from the html
        if (ibarTop < -25) {
            currentBar.shift();
            ibar.remove();
            ihole.remove();
        }
        if (ibarTop - 20 < characterTop && ibarTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    if (drop === 0) {
        //So the ball don't drop bellow the bottom of the game
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);