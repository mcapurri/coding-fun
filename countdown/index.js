const Countdown = require("./countdown");

const countdown = new Countdown(15);

countdown.on("secondElapsed", function (num) {
    if (num > 0) {
        console.log(num);
    } else {
        console.log("COUNTDOWN DONE!");
    }
});
