(function () {
    var kitties = document.querySelectorAll("img");
    var dot = document.getElementsByClassName("dot");
    var position = 0;
    var timer;
    var isInTheMiddleOfTransition;

    console.log(dot);

    timer = setTimeout(move, 5000);

    function move(nextIndex) {
        isInTheMiddleOfTransition = true;
        // remove onscreen class from current kitty and dot
        kitties[position].classList.remove("onscreen");
        kitties[position].classList.add("offscreen-left");
        dot[position].classList.remove("dotscreen");
        // make the current kitty the next kitty.
        if (typeof nextIndex == "undefined") {
            position++;
            if (position >= kitties.length) {
                position = 0;
            }
        } else {
            position = nextIndex;
        }

        kitties[position].classList.add("onscreen");
        dot[position].classList.add("dotscreen");
        console.log(isInTheMiddleOfTransition);
    }

    document.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            isInTheMiddleOfTransition = false;
            console.log(isInTheMiddleOfTransition);
            timer = setTimeout(move, 5000);
        }
    });

    for (var i = 0; i < kitties.length; i++) {
        (function (i) {
            dot[i].addEventListener("click", function (e) {
                console.log("click");
                if (e.target.classList.contains("dotscreen")) {
                    return; // do nothing
                }
                if (isInTheMiddleOfTransition) {
                    return; // do nothing
                }
                clearTimeout(timer); // stop the scheduled animation.
                move(i); //bring on kitties[i]
            });
        })(i);
    }

    // Create touch event
    var start;
    document.addEventListener("touchstart", function (e) {
        start = e.changedTouches[0].pageX;
    });

    document.addEventListener("touchend", function (e) {
        var end = e.changedTouches[0].pageX;
        if (start - end > 100) {
            console.log("swipe");
            if (isInTheMiddleOfTransition) {
                return;
            }
            clearTimeout(timer);
            move();
        }
    });
})();
