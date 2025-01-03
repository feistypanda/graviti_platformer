var programCode = function (processingInstance) {
with (processingInstance) {

// setup

angleMode = "radians";

size(600, 600);
smooth();
frameRate(60);

textFont(createFont("signika"), 20);
textAlign(CENTER);

levelEditor.display = function() {

    // move the matrix for the panning camera
    pushMatrix();
    translate(this.offset.x, this.offset.y);

    // we dont want any stroke on our rects
    noStroke();

    // loop through the blocks. for of is pretty cool :)
    for (let i in this.blocks) {

        let block = this.blocks[i];

        // the color of the block is stored with its information
        fill(block.color);

        // draw the block
        rect(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE);

        // if its a wall block

        if (!(block.name === "wall")) continue;

        let [x, y, w, h] = [block.x, block.y, BLOCK_SIZE, BLOCK_SIZE];
        let [cx, cy] = [x + w/2, y + h/2];

        for (let i in block.neededColored) {

            if (click) console.log(this.blocks);
            let side = block.neededColored[i];
            fill(colors[block.colorNeeded[i]], 100);

            switch (side) {
            case "top":
                triangle(cx, cy, x, y, x + w, y);
                break;
            case "left":
                triangle(cx, cy, x, y, x, y + h);
                break;
            case "right":
                triangle(cx, cy, x + w, y, x + w, y + h);
                break;
            case "bottom":
                triangle(cx, cy, x, y + h, x + w, y + h);
                break;
            }
        }

        // make it clear that its a wall block so that if all of the sides are the same color
        fill(block.color);
        rect(x + w/4, y + w/4, w/2, w/2);
    }


    popMatrix();

    fill(220, 150);
    rect(0, this.pannelY, 600, 600 - this.pannelY);
    fill(0);
    textAlign(LEFT, CENTER);
    text("selected: " + this.typesOfBlocks[this.currentBlock], 10, this.pannelY + (600 - this.pannelY)/2);


};

// draw function

draw = function () {

    // update the positions of the mouse
    globalMouseX = mouseX - levelEditor.offset.x;
    globalMouseY = mouseY - levelEditor.offset.y;

    //clear the screed
    background(255);

    // run the edditor
    levelEditor.run();

    // so that a click only registers once
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
    globalMouseButton = mouseButton;
}

};};

var canvas = document.querySelector("#mycanvas"); 
var processingInstance = new Processing(canvas, programCode);
