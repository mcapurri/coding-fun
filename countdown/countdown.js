const { EventEmitter } = require("events");

class Countdown extends EventEmitter {
    constructor(num) {
        super();
        this.num = Math.abs(num);
        this.countSeconds();
        //
    }

    countSeconds() {
        if (this.num < 0) {
            return;
        }
        setTimeout(() => {
            this.emit("secondElapsed", this.num);
            this.num--;
            this.countSeconds();
        }, 1000);
    }
}

module.exports = Countdown;
