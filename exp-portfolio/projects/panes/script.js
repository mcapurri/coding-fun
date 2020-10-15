//mouse down on the bar
//mouseoves whilst mouse down.
//update CSS properties.

var bar = $("#bar");
var topimage = $("#top-image");
console.log(bar);
console.log(topimage);

// event mouse down, has to be on the bar.
bar.on("mousedown", function () {
    function drag(e) {
        // console.log("drag");
        var cursor = e.pageX - 8;
        // console.log(cursor);
        if (cursor <= 595 && cursor >= 0) {
            topimage.css({
                width: cursor + "px",
            });
            bar.css({
                left: cursor,
            });
        } else {
            return;
        }
    }
    // console.log("click the bar");
    $(".container")
        .on("mousemove", drag)
        .on("mouseup", function (e) {
            $(e.currentTarget).off("mousemove", drag);
        });
});
