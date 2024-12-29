var programCode = function (processingInstance) {
with (processingInstance) {


// setup

angleMode = "radians";

size(600, 600);
smooth();
frameRate(60);

levelEditor.display = function() {
    for (let i in this.blocks) {
        fill(0, 0, 0);
        rect(this.blocks[i].x, this.blocks[i].y, BLOCK_SIZE, BLOCK_SIZE);
    }
};

// draw function

draw = function () {
    globalMouseX = mouseX;
    globalMouseY = mouseY;
    background(255);
    levelEditor.run();
    click = false;
}

// user interactions

keyPressed = () => {
    keys[keyCode] = keys[key.toString().toLowerCase()] = true;
}

keyReleased = () => {
    keys[keyCode] = keys[key.toString().toLowerCase()] = false;
}

mousePressed = () => {
    click = true;
}

};};

var canvas = document.querySelector("#mycanvas"); 
var processingInstance = new Processing(canvas, programCode);
