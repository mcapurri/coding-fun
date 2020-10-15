console.log("sanity check", $);
(function () {
    var currentPlayer = "trump";

    function switchPlayer() {
        currentPlayer === "trump" // using a ternary operator for the if clause
            ? (currentPlayer = "biden")
            : (currentPlayer = "trump");
    }

    $(".modal").on("click", ".reset-btn", function () {
        //event delagation
        $(".modal").fadeOut();
        location.reload();
    });

    function checkForVictory(slots) {
        console.log("Im checking for victory!!", slots);
        var count = 0;

        for (var i = 0; i < slots.length; i++) {
            var slot = $(slots[i]);
            console.log("slot: ", slot);

            if (slot.hasClass(currentPlayer)) {
                count++;
                console.log("count: ", count);
                if (count == 4) {
                    return true;
                }
            } else {
                //if it found the other player then reset the count to 0
                count = 0;
            }
        }
    }
    function downward(x, y) {
        console.log("X,Y", x, y);
        var arrDown = [];
        if (x > y) {
            x = x - y;
            y = 0;
        } else if (x < y) {
            y = y - x;
            x = 0;
        } else {
            x = 0;
            y = 0;
        }
        var column = $(".column");
        console.log("x, y: ", x, y);
        while (x <= 5 && y <= 6) {
            var slot = column.eq(y).children().eq(x);
            console.log("Slot: ", slot);
            arrDown.push(slot);
            x++;
            y++;
        }
        return arrDown;
    }

    function upward(x, y) {
        var arrUp = [];
        if (x + y <= 5) {
            x = x + y;
            y = 0;
        } else {
            y = x + y - 5;
            x = 5;
        }
        var column = $(".column");
        console.log("x, y: ", x, y);
        while (x >= 0 && y <= 6) {
            var slot = column.eq(y).children().eq(x);
            console.log("Slot: ", slot);
            arrUp.push(slot);
            x--;
            y++;
        }
        return arrUp;
    }
    function checkForDiagonals(x, y) {
        var diagDown = downward(x, y);
        var diagUp = upward(x, y);

        console.log("diagDown: ", diagDown);
        console.log("diagUp: ", diagUp);

        // check for any diagonal wins
        if (checkForVictory(diagDown)) {
            return true;
        } else if (checkForVictory(diagUp)) {
            return true;
        }
    }
    function drawCheck() {
        var slots = $(".slot");
        var isDraw = true;
        for (let i = 0; i < slots.length; i++) {
            if (
                !slots.eq(i).hasClass("trump") &&
                !slots.eq(i).hasClass("biden")
            ) {
                isDraw = false; // if the slot is empty, than it is not a draw
            }
        }
        return isDraw; // return true or false
    }

    $(".column").on("click", function (e) {
        console.log("clicked on a column");

        var col = $(e.currentTarget);
        console.log(col);
        var slotsInCol = col.children();
        console.log("slotsInColumn: ", slotsInCol);

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            var hastrump = slotsInCol.eq(i).hasClass("trump");
            var hasbiden = slotsInCol.eq(i).hasClass("biden");

            console.log("slots: ", slotsInCol.eq(i).hasClass("trump"));

            // I check they don't have the player class
            if (!hastrump && !hasbiden) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        var slotsInRow = $(".row" + i); //target the slots in the row i
        console.log("slotsInRow: ", slotsInRow);

        // check if the column is full..
        if (i === -1) {
            return;
        }
        var x = i;
        var y = col.index();
        console.log("rowIndex:", x);
        console.log("colIndex: ", y);
        var winnerText = "";
        var winnerName = currentPlayer;
        var modalText = $(".modal-text");
        var overlay = $(".overlay");
        var gameContainer = $(".game-container");

        if (currentPlayer == "trump") {
            winnerName = "Donald J. Trump";
        } else {
            winnerName = "Joe Biden";
        }

        //WIN CHECKER
        if (checkForVictory(slotsInCol)) {
            gameContainer.addClass("animation-on");
            $(".modal").addClass("on");
            overlay.addClass("overlay-on");
            winnerText += "<h3>" + winnerName + " wins!</h3>";
            console.log(winnerText);
        } else if (checkForVictory(slotsInRow)) {
            gameContainer.addClass("animation-on");
            $(".modal").addClass("on");
            overlay.addClass("overlay-on");
            winnerText += "<h3>" + winnerName + " wins!</h3>";
        } else if (checkForDiagonals(x, y)) {
            gameContainer.addClass("animation-on");
            $(".modal").addClass("on");
            overlay.addClass("overlay-on");
            winnerText += "<h3>" + winnerName + " wins!</h3>";
        } else if (drawCheck()) {
            $(".modal").addClass("on");
            gameContainer.addClass("animation-on");
            overlay.addClass("overlay-on");
            winnerText += "<h3>It was a draw!</h3>";
        } else {
            switchPlayer();
        }
        modalText.html(winnerText);
    });
})();
