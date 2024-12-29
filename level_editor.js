
// to be level editor
levelEditor = (function() {
    function LevelEditor () {
        this.blocks = [];
        this.offset = vector.new(0, 0);
    }

    /**
     * this function pushes a block to the array holding all of the (unsorted) blocks
     * @param config {object} this config object holds all of the info for creating the new block
    **/
    LevelEditor.prototype.add = function (config) {
        this.blocks.push(config);
    }

    LevelEditor.prototype.update = function() {
        if (click) {

            let [x, y] = [globalMouseX - globalMouseX % BLOCK_SIZE, globalMouseY - globalMouseY % BLOCK_SIZE]

            this.blocks = this.blocks.filter(k => k.x !== x || k.y !== y);

            this.add({
                x, y,
                w: BLOCK_SIZE, h: BLOCK_SIZE,
                type: "W",
                name: "wall",
                color: -3618616,
                neededColored: [],
            });
        }

        // if the space bar is pressed then log the info
        if(keys[" "]) {
            this.log();
        }
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
        console.log(data);
    }

    // create a level editor that can be used
    return new LevelEditor();
})();