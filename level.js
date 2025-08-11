
// the code that handles the storage and usage of levels
level = (function () {
    function Level() {

        // array of level data
        this.levels = [];

        // index of the current level
        this.currentLevelInd = 18;

        // array containing all of the block objects in the current level
        this.currentLevel = [];

        this.totalFillables = 0;
        this.fillablesFilled = 0;
        this.redFilled = 0;
        this.greenFilled = 0;
        this.blueFilled = 0;
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
            // processing.image(this.currentLevel[i].graphics);
        }
    };

    Level.prototype.fillLevel = function () {

        // reset some stuff
        this.currentLevel = [];

        this.fillablesFilled = 0;
        this.redFilled = 0;
        this.greenFilled = 0;
        this.blueFilled = 0;
        this.totalFillables = 0;

        // keep track of the blocks to be added
        let infoList = [];

        // keep track of the blocks with identifiers
        let ids = {};

        // convert the level data into an array of block objects

        // loop through all of the rows in the level to be used
        for (let i in this.levels[this.currentLevelInd]) {

            // loop through all of the data in the row currently being looped through
            for (let j in this.levels[this.currentLevelInd][i]) {

                i = +i, j = +j;

                // get the block to be added
                let typeInLevelArr = this.levels[this.currentLevelInd][i][j];

                // if it has an id, record it
                if (typeInLevelArr.id !== undefined) ids[typeInLevelArr.id] = infoList.length;

                // skip over this block if it is an empty space in the level data and push a 0 to the info array
                if (typeInLevelArr === " ") {

                    infoList.push(0);
                    continue;
                }

                // skip if this is the square that the player spawns in
                if (typeInLevelArr.name === "spawn") {

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
                        return ind >= 0 && ind < this.levels[this.currentLevelInd].length;
                    }
                    return ind >= 0 && ind < this.levels[this.currentLevelInd][i].length;
                }

                // get the block data for the block being checked
                let type = blockTypes[typeInLevelArr];

                if (typeof typeInLevelArr !== "string") type = typeInLevelArr;

                // if its a wall find the neigbors, this is so that the needed colord patches can combine
                if (type.name === "wall") {

                    // for both top and bottom
                    ["top", "bottom"].forEach((k) => {

                        // check if the block has the side in its needed colored sides
                        if (type.neededColored.includes(k)) {

                            // check to the left
                            if (indIn(+j - 1)) {

                                // store the block that is to the left
                                let targ = this.levels[this.currentLevelInd][i][+j - 1];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].left = true;
                                }
                            }

                            // check to the right
                            if (indIn(+j + 1)) {
                                
                                // store the block that is to the right
                                let targ = this.levels[this.currentLevelInd][i][+j + 1];

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
                            if (indIn(+i - 1, true)) {

                                // store the block above to easier acess
                                let targ = this.levels[this.currentLevelInd][+i - 1][j];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].top = true;
                                }
                            }

                            // check below the block
                            if (indIn(+i + 1, true)) {
                                
                                // store the block below to easier acess
                                let targ = this.levels[this.currentLevelInd][+i + 1][j];

                                if (targ && targ.neededColored && targ.neededColored.includes(k)) {
                                    neighborColors[k].bottom = true;
                                }
                            }
                        }
                    });
                }

                let info = utilities.copyObj(typeInLevelArr);

                // if its a pad block connected to another block record the index of that block
                if (info.connectedId !== undefined) info.connectedTo = ids[info.connectedId];

                info.x = j * BLOCK_SIZE; 
                info.y = i * BLOCK_SIZE;
                info.w = BLOCK_SIZE;
                info.h = BLOCK_SIZE;
                info.neighborColors = neighborColors;

                // record how many colored things the player needs to color
                info.neededColored?.forEach(k => this.totalFillables += 1);

                infoList.push(info);
            }
        }

        for (let i of infoList) {

            if (i === 0) {
                this.currentLevel.push(0);
                continue;
            };
            if (i.connectedId !== undefined) i.connectedTo = ids[i.connectedId];

            this.currentLevel.push(new Block(i));
        }
    };

    Level.prototype.runPlayer = function () {

        // run the player
        player.run();
    };

    Level.prototype.runLevel = function () {
        
        // misc stuff in the level
        this.displayStuff();
    
        if (this.totalFillables <= this.fillablesFilled && levelTransition.amt >= 1) {
            // transition to the next level
            levelTransition.reset();
        }

        if (keys.r && levelTransition.amt >= 1) {

            levelTransition.reset(true);
        }
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
                    levelData[i].push(" ");

                    // update the variable
                    len = levelData[i].length;
                }
            })(i);
        }

        // add the newly rectangular level data to the levels array
        this.levels.push(levelData);
    }

    Level.prototype.run = function () {
        // run all of the blocks in the level
        this.runBlocks();

        // run the player
        this.runPlayer();
    };

    // create the level handeler object and then return it into the global 'level' variable
    return new Level();
})();
