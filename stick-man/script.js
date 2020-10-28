(function () {
    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");

    //circle
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(250, 100, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "turquoise";
    ctx.fill();

    //draw triangle
    // ctx.beginPath();
    // ctx.strokeStyle = "crimson";
    // ctx.lineWidth = 5;
    // ctx.moveTo(100, 100);
    // ctx.lineTo(400, 100);
    // ctx.lineTo(250, 300);
    // ctx.lineTo(100, 100);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fillStyle = "pink";
    // ctx.fill();

    //draw body
    ctx.beginPath();
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 350);
    ctx.stroke();

    //draw left arm
    ctx.beginPath();
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.moveTo(150, 150);
    ctx.lineTo(250, 250);
    ctx.stroke();

    //draw right arm
    ctx.beginPath();
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.moveTo(350, 150);
    ctx.lineTo(250, 250);
    ctx.stroke();

    //draw left leg
    ctx.beginPath();
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.moveTo(150, 450);
    ctx.lineTo(250, 350);
    ctx.stroke();

    //draw right leg
    ctx.beginPath();
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;
    ctx.moveTo(350, 450);
    ctx.lineTo(250, 350);
    ctx.stroke();

    // Bonus, one canvas has the stick figure. One redraws the image of the stick figure. Store a path in variable?
    // canvasTop += 5;
    var bigcanvas = document.getElementById("bigcanvas");
    var bigctx = bigcanvas.getContext("2d");

    bigctx.drawImage(canvas, 0, 0);

    var canvasLeft = 0;
    var canvasTop = 0;

    var goingUp = document.getElementById("goingUp");
    var goingDown = document.getElementById("goingDown");

    // // up function
    document.addEventListener("keydown", function () {
        if (event.keyCode == 38) {
            if (canvasTop <= -50) {
                goingUp.style.display = "block";
            } else {
                bigctx.clearRect(0, 0, 700, 700);
                canvasTop -= 5;
                bigctx.drawImage(canvas, 0, canvasTop);
            }
        }
    });
    // // left function
    document.addEventListener("keydown", function () {
        if (event.keyCode == 37) {
            bigctx.clearRect(0, 0, 700, 700);
            canvasLeft -= 5;
            bigctx.drawImage(canvas, canvasLeft, 0);
        }
    });
    // // down function
    document.addEventListener("keydown", function () {
        if (event.keyCode == 40) {
            if (canvasTop >= 250) {
                goingDown.style.display = "block";
            } else {
                bigctx.clearRect(0, 0, 700, 700);
                canvasTop += 5;
                bigctx.drawImage(canvas, 0, canvasTop);
            }
        }
    });
    // // right function
    document.addEventListener("keydown", function () {
        if (event.keyCode == 39) {
            bigctx.clearRect(0, 0, 700, 700);
            canvasLeft += 5;
            bigctx.drawImage(canvas, canvasLeft, 0);
        }
    });
})();
