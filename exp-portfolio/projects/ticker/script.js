(function () {
    /* use an IFFE to be able to freely and undangereously declare variables */
    var headlines = document.getElementById("headlines-container");

    var links = document.getElementsByTagName("a");

    var left = headlines.offsetLeft;
    console.log("starting coordinates of headlines: ", left);

    var reqId;

    function move() {
        left--;

        if (left <= -links[0].offsetWidth) {
            // add the width of the first link to left
            left += links[0].offsetWidth;
            // append the first link so it becomes the last link
            links[0].parentElement.appendChild(links[0]);
        }
        // move headlines element to left + the unit

        headlines.style.left = left + "px";
        reqId = requestAnimationFrame(move);
    }

    move();

    // storing and refreshing the id of requestAnimationFrame(move) everytime it runs
    // DAY 2
    //we'll need to use an event listener to detect when the mouse is hovering elements
    //mouseover - javascript version of hover
    // this code does not work because the result is an ARRAY and ARRAYS do not have .addEventListener

    /* links.addEventListener("mouseover", function () {
        console.log("mouse over works");
    }); */

    // we have to target every single element in the array
    for (var i = 0; i < links.length; i++) {
        console.log(links[i]);
        links[i].addEventListener("mouseover", function () {
            console.log("mouseover is running!");
            // change style
            this.style.color = "hotpink";
            // stop ticker with cancelAnimationFrame
            console.log(reqId);
            cancelAnimationFrame(reqId);
        });
        // add mouseleave
        links[i].addEventListener("mouseleave", function () {
            console.log("mouseleave works!");
            // undo the styling
            this.style.color = "inherit";
            // restart, use move somehow
            reqId = requestAnimationFrame(move);
        });
    }
})();
