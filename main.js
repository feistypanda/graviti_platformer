var programCode = function (processingInstance) {
with (processingInstance) {


// setup

angleMode = "radians";

size(600, 600);
smooth();
frameRate(60);


// constructors

// Block:
Block.prototype.display = function () {
        noStroke();
        fill(this.color);
        rect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);

        if (this.type === "wall") {
            for (let i in this.positionsOfColorables) {

                fill(colors[this.sideColors[i].color]);

                if (this.sideColors[i].color === "none"){

                    let c = colors[this.sideColors[i].colorNeeded];

                    fill(
                        red(c),
                        green(c),
                        blue(c),
                        100
                    );
                }
                
                beginShape();

                for (let j in this.positionsOfColorables[i].x) {
                    
                    vertex(this.positionsOfColorables[i].x[j], this.positionsOfColorables[i].y[j]);
                }

                endShape(CLOSE);

            }
        }
};

//Player:

Player.prototype.display = function () {
    noStroke();
    fill(this.color);
    rect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);
};

player = new Player(
    {
        x: 200, y: 200,
        w: BLOCK_SIZE * 0.8, h: BLOCK_SIZE*0.8,
        color: color(100, 100, 200),
    });

_camera = new Camera (player);

level = (function () {
    function Level() {

        // array of level data
        this.levels = [];

        // index of the current level
        this.currentLevelInd = 0;

        // array containing all of the block objects in the current level
        this.currentLevel = [];
    }

    Level.prototype.runBlocks = function () {

        // loop through all of the blocks and run them
        for (var i in this.currentLevel) {

            // if the space is an empty block, skip
            if (!this.currentLevel[i]) {
                continue;
            }

            // run the block
            this.currentLevel[i].run();
        }
    };

    Level.prototype.fillLevel = function () {

        // convert the level data into an array of block objects

        // loop through all of the rows in the level to be used
        for (var i in this.levels[this.currentLevelInd]) {

            // loop through all of the data in the row currently being looped through
            for (var j in this.levels[this.currentLevelInd][i]) {

                // get the character representation of the block to be added
                var typeInLevelArr = this.levels[this.currentLevelInd][i][j];

                // skip over this block if it is an empty space in the level data and push a 0 to the level array
                if (typeInLevelArr === " ") {

                    // fill the 1d level array with a 0 to signify no block
                    this.currentLevel.push(0);
                    continue;
                }

                // skip if this is the square that the player spawns in
                if (typeInLevelArr === "@") {

                    // spawn the plalyer, also reset it
                    player.reset(j * BLOCK_SIZE, i * BLOCK_SIZE);

                    // skip this block
                    continue;
                }

                // store the locations of neighboring needed colored sides
                let neighborColors = {
                    top : {left: false, right: false},
                    bottom : {left: false, right: false},
                    left : {top: false, bottom: false},
                    right : {top: false, bottom: false},
                };

                // function that checks if a indicie is in the level data
                let indIn = (ind, iInd) => {

                    if (iInd) {
                        return ind >=0 && ind < this.levels[this.currentLevelInd].length;
                    }
                    return ind >=0 && ind < this.levels[this.currentLevelInd][i].length;
                }

                // get the block data for the block being checked
                let type = blockTypes[typeInLevelArr];

                // if its a wall wind the neigbors, this is so that the needed colord patches can combine
                if (type.name === "wall") {

                    // for both top and bottom
                    ["top", "bottom"].forEach((k) => {

                        // check if the block has the side in its needed colored sides
                        if (type.neededColored.includes(k)) {

                            // check to the left
                            if (indIn(+j - 1)) {

                                // store the block that is to the left
                                let targ = blockTypes[this.levels[this.currentLevelInd][i][+j - 1]];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].left = true;
                                }
                            }

                            // check to the right
                            if (indIn(+j + 1)) {
                                
                                // store the block that is to the right
                                let targ = blockTypes[this.levels[this.currentLevelInd][i][+j + 1]];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].right = true;
                                }
                            }
                        }
                    });

                    // for both left and right
                    ["left", "right"].forEach((k) => {

                        // check if the current side is used by the blocks needed colored sides
                        if (type.neededColored.includes(k)) {

                            // check above the square
                            if (indIn(+i - 1)) {

                                // store the block above to easier acess
                                let targ = blockTypes[this.levels[this.currentLevelInd][+i - 1][j]];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].top = true;
                                }
                            }

                            // check below the block
                            if (indIn(+i + 1)) {
                                
                                // store the block below to easier acess
                                let targ = blockTypes[this.levels[this.currentLevelInd][+i + 1][j]];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].bottom = true;
                                }
                            }
                        }
                    });
                }

                // create the block
                var b = new Block({
                    x: j * BLOCK_SIZE, y: i * BLOCK_SIZE,
                    w: BLOCK_SIZE, h: BLOCK_SIZE,
                    type: blockTypes[typeInLevelArr],
                    colorNeeded: "red",
                    neighborColors: neighborColors,
                });

                // push it to the array to be used
                this.currentLevel.push(b);
            }
        }
    };

    Level.prototype.runPlayer = function () {

        // run the player
        player.run();
    };

    Level.prototype.runLevel = function () {
        // misc stuff in the level
    };

    Level.prototype.addLevel = function (levelData) {

        // start at zero, whenever a larger row length is found in the data it will be updated to that
        let sizeOfRow = 0;

        // loop through all of the rows in the level
        for (var i in levelData) {

            // if the length of the current row is greater than the current longest found length update the size of row, otherwise do nothing
            sizeOfRow = levelData[i].length > sizeOfRow ? levelData[i].length : sizeOfRow;
        }

        // loop through all of the rows again, this time were adding on to the shorter rows to make a nice neat rectangle
        for (var i in levelData) {

            // shortcut to the length of the current row
            var len = levelData[i].length;

            // if the length of the current row is shorter than the longest row perform a function to add spaces on to it until it is the right size
            if (len < sizeOfRow) ((i) => {

                // loop and make the row bigger until its as big as the biggest one
                while(len < sizeOfRow) {

                    // make it longer
                    levelData[i] += " ";

                    // update the variable
                    len = levelData[i].length;
                }
            })(i);
        }

        // add the newly rectangular level data to the levels array
        this.levels.push(levelData);
    }

    Level.prototype.run = function () {

        //bacground
        background(240, 200);

        // run all of the blocks in the level
        this.runBlocks();

        // run the player
        this.runPlayer();

        // check for winning and player dying and other misc
        this.runLevel();
    };

    // create the level handeler object and then return it into the global 'level' variable
    return new Level();
})();

levelEditor = (function() {
    function LevelEditor () {
        this.blocks = [];
    }

    LevelEditor.prototype.add = function (config) {
        this.blocks.push(config);
    }

    LevelEditor.prototype.run = function () {
        this.add({
            x: 0, y: 0,
            w: BLOCK_SIZE, h: BLOCK_SIZE,
            type: blockTypes["W"],
            name: "W",
        });
    }

    LevelEditor.prototype.log = function () {

        let findMostIndex = (comparison) => {
            let mostIndex = -1;
            let mostCoord = Infinity;

            // loop through all of the blocks
            this.blocks.forEach((k, i) => {
                if (comparison(k, mostCoord)) {
                    mostIndex = i;
                    mostCoord = k.x;
                }
            });

            // return the result of the search
            return mostIndex;
        };

        // first find the leftmost block index
        let leftmostIndex = findMostIndex((a, b) => {
            return a.x < b;
        });
        
        // now find the upmost block index
        let upmostIndex = findMostIndex((a, b) => {
            return a.y < b;
        });

        // make the array of data that will be filled up with the symbol representation of the blocks
        let data = [];

        // make an array  of the blocks that should go into the row that we are currently filling
        let row = [];
        
    }
})();

level.addLevel(levelData[0]);

level.fillLevel();

// scenes
function scenes() {
    let play = (function () {
        function Play() {
            this.pastRotateAmt = 0;
            this.rotateAmt = 0;
            this.rotateLerp = 1;
        }

        Play.prototype.calcRotate = function () {
            this.rotateLerp = min(this.rotateLerp + 0.12, 1);

            if (player.gravity.x > 0) {
                if (this.rotateAmt !== PI/2) {
                    this.pastRotateAmt = this.rotateAmt;
                    this.rotateLerp = 0;
                }
                this.rotateAmt = PI/2;
            }
            if (player.gravity.x < 0) {
                if (this.rotateAmt !== PI*1.5) {
                    this.pastRotateAmt = this.rotateAmt;
                    this.rotateLerp = 0;
                }
                this.rotateAmt = PI*1.5;
            }
            if (player.gravity.y < 0) {
                if (this.rotateAmt !== PI) {
                    this.pastRotateAmt = this.rotateAmt;
                    this.rotateLerp = 0;
                }
                this.rotateAmt = PI;
            }
            if (player.gravity.y > 0) {
                if (this.rotateAmt !== 0) {
                    this.pastRotateAmt = this.rotateAmt;
                    this.rotateLerp = 0;
                }
                this.rotateAmt = 0;
            }
        };

        Play.prototype.doRotate = function () {

            let pastRotate = this.pastRotateAmt;
            let curRotate = this.rotateAmt;

            if (curRotate - pastRotate < -PI) {

                pastRotate -= TWO_PI;

            } else if (pastRotate - curRotate< -PI) {

                pastRotate += TWO_PI;

            }

            rotate(lerp(pastRotate, curRotate, this.rotateLerp));
        };

        Play.prototype.translateWithRotate = function() {

            // all of the different translation ammounts
            let coord1 = ~~(-(-_camera.position.y + height/2 - player.dimensions.h/2));
            let coord2 = ~~(-_camera.position.x + width/2 - player.dimensions.w/2);
            let coord3 = ~~(-_camera.position.y + height/2 - player.dimensions.h/2);
            let coord4 = ~~(-(-_camera.position.x + width/2 - player.dimensions.w/2));

            // mish max the values in a way that works
            let translate1 = vector.new(coord1, coord2);
            let translate2 = vector.new(coord3, coord4);
            let translate3 = vector.new(coord4, coord1);
            let translate4 = vector.new(coord2, coord3);

            // for each direction
            let translateMap = {
                1.5707963267948966: translate1,
                4.71238898038469:   translate2,
                3.141592653589793:  translate3,
                0:                  translate4,
            };

            // lerp between now and last for smooth rotate
            translate(
                lerp(translateMap[this.rotateAmt].x, translateMap[this.pastRotateAmt].x, 1 - this.rotateLerp),
                lerp(translateMap[this.rotateAmt].y, translateMap[this.pastRotateAmt].y, 1 - this.rotateLerp)
                );
        };

        Play.prototype.run = function () {
            _camera.run();

            this.calcRotate();
            
            pushMatrix();

            // translate so its still centered with the rotation
            this.translateWithRotate();            
            
            translate(width/2, height/2);

            this.doRotate();
            
            translate(-width/2, -height/2);
            level.run();
            popMatrix();
        }

        return new Play();
    })();

    return {
        play: play,
    };
}

scenes = scenes();

// draw function

draw = function () {

    scenes[scene].run();

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
