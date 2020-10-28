/* 
all motion must be from right to left
probably set time out to make the timer work? javascript should just trigger it
check the navbar of the website project to check animation
remove the onscreen class from one img and set it to another img
*/
// (function () {
//     console.log("sanity check");

//     var kitty = document.querySelectorAll(".kitty");

//     var current = 0; // the kitty

//     for (var i = 0; i < kitty1.length: i++) {
//         kitty[i].addEventListener("transitionend", function (e)) {
//             if (e.target.classList.contains("offscreen-left")) {
//                 e.target.classList.remove("offscreen-left";
//             }

//         });
//     }
//     // or
//     document.addEventListener("transitionend", function (e)) {
//             if (e.target.classList.contains("offscreen-left")) {
//                 e.target.classList.remove("offscreen-left");
//                 setTimeout(moveKitties, 2000);
//             }

//         });

//     })

//     setTimeout(moveKitties, 5000);

//     function moveKitties() {
//         // remove onscreen class from current kitty
//         // add offscreen-left class to current kitty
//         console.log("current: ", current);
//         // make the next kitty to be the current kitty /// change the current status
//         current++;
//         if (current >= kitties.length) {
//             current = 0;
//         }
//         // add onscreen class to the new current kitty
//         console.log("the new current kitty is " + current);

//         setTimeout(moveKitties, 2000);
//     }
// })();

// /// because of the dots we want to have the kitties back on the right ASAP

// kitty1.classList.remove("on-screen");

// kitty1.classList.add("off-screen-left");
// kitty2.classlist.add("on-screen");

// // listen for the event to wait for the transition to be over
// // called: transitionend

// my working code + david's code on 14. 08. 2020

(function () {
    console.log("sanity check");

    var kitty = document.querySelectorAll(".kitty");

    var dots = document.querySelectorAll(".dots");

    var current = 0;

    var timer; // to store the time of setTimeout

    var isTheAnimationOn;

    console.log("current: ", current);

    document.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 2000); // storing the timeout value in a variable
        }
        isTheAnimationOn = false;
    });

    // BEGIN - new part how to make dots clickable

    // // 1st solution - adding an ID to the dots

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function (e) {
            console.log("you clicked motherfucka!");
            console.log(e.target.id.slice(3));
        });
    }

    // // 2nd solution -

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function (e) {
            console.log("i: ", i);
            console.log("you clicked motherfucka!");
            console.log("e.target: ", e.target);
            for (var i = 0; i < dots.length; i++) {
                if (dots[i] == e.target) {
                    console.log(i);
                }
            }
        });
        console.log("i: ", i);
    }
    console.log("i: ", i);

    // // 3rd solution

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", getClickhandler (i) {
            console.log("you clicked motherfucka!");
            console.log(i);
        });

    console.log("i: ", i);
    }

    function getClickhandler(i) {
        return function() {
            console.log(i);
        }
    }
    console.log("i: ", i);

    // // variation of 3rd solution

    for (var i = 0; i < dots.length; i++) {
        (function (i) {
            dots[i].addEventListener("click", function (){
                console.log(i);
                // how to avoid bugs if they click on the ACTUALLY LIT DOT 
                if (e.target.classList.contains('on')) {
                    // clearTimeout(timer); 
                    // timer = setTimeout(moveKitties, 2000);
                    return; // this would be doing nothing basically 
                }
                // how to avoid bugs if somebody clicks on the dots while the animation works
                if (isTheAnimationOn) {
                    return; // waits until the animation is over and then goes to the clicked slide
                }
                 
                // solution to CANCEL ANIMATION 
                clearTimeout(timer); //we stored the timeout value in every function where we called the timeoout
                moveKitties(i);
            });
        })(i);
    };

    // END - new part how to make dots clickable

    // OLD moveKitties
    // function moveKitties() {
    //     kitty[current].classList.remove("onscreen");
    //     dots[current].classList.remove("filled");
    //     kitty[current].classList.add("offscreen-left");
    //     current++;
    //     if (current >= kitty.length) {
    //         current = 0;
    //     }
    //     kitty[current].classList.add("onscreen");
    //     dots[current].classList.add("filled");

    //     // add onscreen class to the new current kitty
    //     console.log("the new current kitty is " + current);
    // }

    function moveKitties(nextIndex) {
        // isTheAnimationOn = true;
        kitty[current].classList.remove("onscreen");
        dots[current].classList.remove("filled");
        kitty[current].classList.add("offscreen-left");

        if (nextIndex == undefined) {
            current++;
            if (current >= kitty.length) {
            current = 0;
            };
        } else {
            current = nextIndex;
        }

        kitty[current].classList.add("onscreen");
        dots[current].classList.add("filled");

        // add onscreen class to the new current kitty
        console.log("the new current kitty is " + current);
    }

    timer = setTimeout(moveKitties, 2000); // also here added the actualization of the variable 'timer'
})();

/// when you click a dot you wanna cancel the planned animation
/// we want to take the kitty which corresponds to the clicked dot immediately
// the kitty which is on screen still needs to go off - this stays the same
// what changes is that we need to know the index which needs to come on screen, if the first dot is clicked we need to know is zero and so on
