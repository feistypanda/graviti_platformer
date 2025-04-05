
// to be level editor
levelEditor = (function() {
    function LevelEditor () {
        this.blocks = [];
        this.offset = vector.new(0, 0);

        // the list of the different block types to cycle through
        this.typesOfBlocks = ["W", "C", "Erase", "@", "pad", "door"];

        // the index of the type of block that is currently selected in the block types array
        this.currentBlock = 1;

        // the display pannel
        this.pannelY = 520;
    }

    // function to find the coordinates of the block where the mouse is
    LevelEditor.prototype.findBlockCoords = function () {
        // shortcuts
        let type = this.typesOfBlocks[this.currentBlock];
        let [mouseX, mouseY] = [globalMouseX, globalMouseY];

        // calculate the x and y of the new block based off of the coordinates of the mouse
        let [x, y] = [mouseX - mouseX % BLOCK_SIZE, mouseY - mouseY % BLOCK_SIZE]
        
        // because of the shifting camera, the mouse can go into negative coordinates which messes up the modulo, so this is to correct the error
        if (mouseX < 0) x -= BLOCK_SIZE;
        if (mouseY < 0) y -= BLOCK_SIZE;

        // return the variables
        return [x, y, type];
    };

    // function to add a block where the mouse is
    LevelEditor.prototype.add = function () {

        // get the x and y of the block where the mouse is and the type of block to add
        [x, y, type] = [...this.findBlockCoords()];

        // remove all blocks already at this coordinate so that we dont get overlapment
        this.blocks = this.blocks.filter(k => k.x !== x || k.y !== y);

        // if the eraser is selected then dont push anything
        if (type !== "Erase") {

            let infoOfBlock = utilities.copyObj(blockTypes[type]);

            // the information for the new block that we are creating
            let info = {...infoOfBlock, x, y};

            if (info.name === "door") info.id = 0;
            if (info.name === "pad") info.connectedId = 0;

            // push a new block. the information is changed based off of which type of block is being added
            this.blocks.push(info);
        }
    }

    // function to edit a block where the mouse is
    LevelEditor.prototype.edit = function() {

        // get the x and y of the block where the mouse is
        [x, y] = [...this.findBlockCoords()];

        // see if there is a block at these coordinates, if there is then get the data of that block
        let blockIndex = this.blocks.findIndex(k => "" + k.x + k.y === "" + x + y);

        // block not found
        if (blockIndex < 0) return;
        let block = this.blocks[blockIndex];

        switch (block.name) {
        case "wall":
            // first find out which part of the block was right clicked on
            let clickedSide;
            let [mouseX, mouseY] = [globalMouseX, globalMouseY];
            let [x, y, w, h] = [block.x, block.y, BLOCK_SIZE, BLOCK_SIZE];
            let [cx, cy] = [x + w/2, y + h/2];

            if (utilities.pointToTri({x: mouseX, y: mouseY}, {x1: x, y1: y, x2: x + w, y2: y, x3: cx, y3: cy})) {
                clickedSide = "top";
            }// top
            if (utilities.pointToTri({x: mouseX, y: mouseY}, {x1: x, y1: y, x2: x, y2: y + h, x3: cx, y3: cy})) {
                clickedSide = "left";
            } // left
            if (utilities.pointToTri({x: mouseX, y: mouseY}, {x1: x + w, y1: y, x2: x + w, y2: y + h, x3: cx, y3: cy})) {
                clickedSide = "right";
            } // right
            if (utilities.pointToTri({x: mouseX, y: mouseY}, {x1: x, y1: y + h, x2: x + w, y2: y + h, x3: cx, y3: cy})) {
                clickedSide = "bottom";
            } // bottom

            let index = block.neededColored.indexOf(clickedSide);

            // now add a needed color
            if (index < 0) {

                block.neededColored.push(clickedSide);
                block.colorNeeded.push("none");
            }
            // if that side already exists, change it
            else {
                let colorNameList = Object.keys(colors);
                let colorValueList = Object.values(colors);
                let newColorName = colorNameList[(colorNameList.indexOf(block.colorNeeded[index]) + 1) % colorNameList.length];
                block.colorNeeded[index] = newColorName;

            }

            break;
        case "color":
            // change the color of the color block
            let colorNameList = Object.keys(colors);
            let colorValueList = Object.values(colors);
            let newColorName = colorNameList[(colorNameList.indexOf(block.colorName) + 1) % colorNameList.length];

            block.colorName = newColorName;
            block.color = colors[newColorName];

            break;
        case "pad":

            if (keys["="]) {

                // change id
                block.connectedId ++;
            } else if (keys["-"]) {
                block.connectedId --;
            } else {
                // figure out the next orientation
                let orientationList = ["top", "left", "bottom", "right"];
                let newOrientaion = orientationList[(orientationList.indexOf(block.orientation) + 1) % orientationList.length];

                // set the oreintation
                block.orientation = newOrientaion;
            }
            break;
        case "door":
            if (keys["="]) {

                // change id
                block.id ++;
            } else if (keys["-"]) {
                block.id --;
            }
            break;
        }
    }; 

    LevelEditor.prototype.update = function() {

        // the mouse is clicked, either add or edit blocks
        if (click) {

            // if the mouse is being left clicked then add a block, otherwise if its a right click edit a block
            switch (globalMouseButton) {

            // left click
            case LEFT:
                this.add();
                break;

            // right click
            case RIGHT:
                this.edit();
                break;
            }
            
        }

        // if the space bar is pressed then log the info
        if(keys[" "]) this.log();

        // if the c key is pressed cycle through the blocks
        if (keys.c) this.currentBlock = (this.currentBlock + 1) % this.typesOfBlocks.length;

        // we only want it to trigger once, so set the key to false
        keys.c = false; 

        // if the arrow keys are pressed, shift the view
        if(keys[UP]) this.offset.y -= 5;
        if(keys[DOWN]) this.offset.y += 5;
        if(keys[LEFT]) this.offset.x -= 5;
        if(keys[RIGHT]) this.offset.x += 5;
    };

    LevelEditor.prototype.run = function () {
        this.update();
        this.display();
    }

    // function to convert the block data stored in this.blocks into a 2d array and then log it to the console
    LevelEditor.prototype.log = function () {

        // make a copy of the this.blocks to use for logging so that we dont change what is on the screen
        let blocks = [...this.blocks];

        /**
         * this function goes through all of the blocks in [blocks] and finds which of those blocks is furthest
         * position wise to any direction
         * @param comparison {callback function} the function that determines if a block is further to a direction than the previosly found furthest coordinate
         * @param axis {string} either "x" or "y", determines if the comparisons are taking place on the x or the y axis
        **/
        let findMostIndex = (comparison, axis) => {
            let mostIndex = -1;
            let mostCoord = Infinity;

            // loop through all of the blocks
            blocks.forEach((k, i) => {
                if (comparison(k, mostCoord)) {
                    mostIndex = i;
                    mostCoord = k[axis];
                }
            });

            // return the result of the search
            return mostCoord;
        };

        // first find the leftmost block index
        let leftmostCoord = findMostIndex((a, b) => {
            return a.x < b;
        }, "x");
        
        // now find the upmost block index
        let upmostCoord = findMostIndex((a, b) => {
            return a.y < b;
        }, "y");

        // make the array of data that will be filled up with the data for the blocks
        // this data is the config info that will be used to create the block in the level
        let data = [];

        /** 
         * this function will add a row of information of blocks to the 2d array of information of the blocks in the level
         * @param rowNumber {integer} number indicating which row to add to the array
        */
        let fillRow = (rowNumber) => {
            // make an array  of the blocks that should go into the row that we are currently filling
            let row = [];

            // make an array of the config info of the blocks in the row
            let rowSymbols = [];
            
            // push all of the config info of blocks in the top row
            // loop backwards because blocks are being spliced
            for (var i = blocks.length - 1; i >= 0; i--) {

                let k = blocks[i];

                // if it is in the row
                if (k.y === upmostCoord + rowNumber * BLOCK_SIZE) {

                    // record this block as part of the row
                    row.push(k);

                    // delete the block from our data
                    blocks.splice(i, 1);
                }
            }
                
            // sort the array by the x value, from least to greatest
            row.sort((a, b) => {
                return a.x - b.x;
            });

            // fill up the array with config info and with spaces
            row.forEach((k, i) => {

                // the square that is to the left of the current square in the current row, or if the current square is the leftmost square, look at the overall leftmost square
                let previos = i ? row[i - 1] : {x:leftmostCoord};

                // push a space to the start of the array to make up for the difference between this square and the square to the left of it
                // this for loop goes for each square that can go between the current square and the square to the left

                for (let j = 0; j < (k.x - previos.x)/BLOCK_SIZE - 1; j++) {
                    // actually pushing the space
                    rowSymbols.push(" ");
                }

                if (!i && (k.x - previos.x)/BLOCK_SIZE > 0) {
                    rowSymbols.push(" ");
                }

                // after all the empty space before the block is dealt with, push the actual block
                rowSymbols.push(k);
            });

            // after we have created an array of the symbol representation of the squares in the current row, then push the newly created array to the larger array of data
            data.push(rowSymbols);
        }

        let curRowNumber = 0; // the row that we are currently filling

        // loop until we have removed all of the blocks in our blocks array
        while (blocks.length > 0) {

            // fill the row
            fillRow(curRowNumber);

            // move on to the next row
            curRowNumber ++
        }

        // log the info so that it can be saved
        console.log(JSON.stringify(data));
    }

    // create a level editor that can be used
    return new LevelEditor();
})();