//Block & Hole code
var counter = 0;
//Making the blocks move 
var currentBlocks = [];
var block = setInterval(function () {
    //Finds the last Block & Hole create so we can take his top position and  add 100 px to the new Block & Hole create so the new block & hole is 100 px bellow the one before
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createAttribute("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        hole.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        //Making the hole random
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        //Keep track of the blocks on screen
        currentBlocks.push(counter);
        counter++;
    }
    //Ball move up & down
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    //Game Over
    if (characterTop < 0) {
        alert("Game Over! Your Score " + (counter - 9));
        clearInterval(block);
        location.reload();
    }
    //Loops the array
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let block = document.getElementById("block" + current);
        let hole = document.getElementById("hole" + current);
        let blockTop = parseFloat(window.getComputedStyle(block).getPropertyValue("top"));
        block.style.top = blockTop - 0.5 + "px";
        hole.style.top = blockTop - 0.5 + "px";
        if (blockTop < -20) {
            currentBlocks.shift();
            block.remove();
            hole.remove();
        }
        if (blockTop - 20 < characterTop && blockTop > characterTop) {
            drop++;
            if (holeLeft <= characterLeft &&
                holeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    if (drop === 0) {
        //Can't drop bellow the bottom of the game
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);