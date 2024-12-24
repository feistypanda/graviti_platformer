
// to be level editor
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

        let findMostIndex = (comparison, axis) => {
            let mostIndex = -1;
            let mostCoord = Infinity;

            // loop through all of the blocks
            this.blocks.forEach((k, i) => {
                if (comparison(k, mostCoord)) {
                    mostIndex = i;
                    mostCoord = k[axis];
                }
            });

            // return the result of the search
            return mostIndex;
        };

        // first find the leftmost block index
        let leftmostIndex = findMostIndex((a, b) => {
            return a.x < b;
        }, "x");
        
        // now find the upmost block index
        let upmostIndex = findMostIndex((a, b) => {
            return a.y < b;
        }, "y");

        // make the array of data that will be filled up with the symbol representation of the blocks
        let data = [];

        // this function will add a row to the 2d array of symbol representations
        // @param rowNumber [integer] number indicating which row to add to the array
        let fillRow = (rowNumber) => {
            // make an array  of the blocks that should go into the row that we are currently filling
            let row = [];

            // make an array of the symbol representations of the blocks in the row
            let rowSymbols = [];
            
            // push all of the blocks in the top row
            for (var i = this.blocks.length - 1; i >= 0; i--) {

                let k = this.blocks[i];

                // if it is in the row
                if (k.y === this.blocks[upmostIndex].y + rowNumber * BLOCK_SIZE) {

                    // record this block as part of the row
                    row.push(k);

                    // remove this block from our data as it is no longer needed
                    this.blocks.splice(i, 1);
                }
            }
                
            // sort the array by the x value, from least to greatest
            row.sort((a, b) => {
                return a.x - b.x;
            });

            // fill up the array with symbol representations and with spaces
            row.forEach((k, i) => {

                // the square that is to the left of the current square in the current row, or if the current square is the leftmost square, look at the overall leftmost square
                let previos = i ? this.blocks[i - 1] : this.blocks[leftmostIndex];

                // push a space to the start of the array to make up for the difference between this square and the square to the left of it
                // this for loop goes for each square that can go between the current square and the square to the left

                for (let j = 0; j < (k.x - previos.x)/BLOCK_SIZE; j++) {
                    // actually pushing the space
                    rowSymbols.push(" ");
                }

                // after all the empty space before the block is dealt with, push the actual block
                rowSymbols.push(k.name);
            });

            // after we have created an array of the symbol representation of the squares in the current row, then push the newly created array to the larger array of data
            data.push(rowSymbols);
        }

        let curRowNumber = 0; // the row that we are currently filling

        // loop until we have removed all of the blocks in our blocks array
        while (this.blocks.length > 0) {

            // fill the row
            fillRow(curRowNumber);

            // move on to the next row
            curRowNumber ++
        }
        
    }
})();