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
        if (block.name !== "pad") {
            rect(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE);
        }

        // if its a wall block
        if (block.name === "wall") {
            let [x, y, w, h] = [block.x, block.y, BLOCK_SIZE, BLOCK_SIZE];
            let [cx, cy] = [x + w/2, y + h/2];

            // loop through all of the colorinables
            for (let i in block.neededColored) {

                let side = block.neededColored[i]; // 'top', 'left', 'right', or 'bottom'
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
        // if its a pressure pad
        else if (block.name === "pad") {

            // styling
            fill(block.color);
            noStroke();

            let sides = {
                "left": vector.new(-1, 0),
                "right": vector.new(1, 0),
                "top": vector.new(0, -1),
                "bottom": vector.new(0, 1),
            };

            // storing variables
            let side = sides[block.orientation]; // this is a vector with a x and y of -1, 0, or 1
            let center = vector.new(block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2); // xy vector

            // draw the rect in different places for different oreintation
            rect(
                side.x ? center.x - BLOCK_SIZE/4 + BLOCK_SIZE/4 * side.x : block.x, 
                side.y ? center.y - BLOCK_SIZE/4 + BLOCK_SIZE/4 * side.y : block.y,
                side.x ? BLOCK_SIZE/2 : BLOCK_SIZE,
                side.y ? BLOCK_SIZE/2 : BLOCK_SIZE, 
                );
        }

        if (block.name === "pad") {
            fill(0);
            text(block.connectedId, block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }

        if (block.name === "door") {
            fill(0);
            text(block.id, block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }
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
