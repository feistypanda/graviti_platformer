
// the blocks in the level
Block = (function () {
    function Block(config) {

        Box.call(this, config);

        this.type = config.name;
        this.color = config.color;

        // if its a color block, store its color in this.colorName
        if (this.type === "color") this.colorName = config.colorName;

        // if its a wall block keep an array with objects showing the colors of its sides.
        if (this.type === "wall") {

            this.sideColors = [];

            for (let i in config.neededColored) {
                this.sideColors.push({color: "none", colorNeeded: config.colorNeeded[i], position: config.neededColored[i]});
            }

            this.positionsOfColorables = [];

            for (let i in this.sideColors) {

                let direction = this.sides[this.sideColors[i].position];

                let s = this.dimensions.w;

                let center = vector.new(this.position.x + s/2, this.position.y + s/2);

                let positions = {
                    x: [],
                    y: [],
                };

                let dirs = ["x", "y"];

                for (let i in dirs) {

                    let sign = Math.sign(direction[dirs[i]]);

                    positions[dirs[i]].push(
                        ~~(sign === 0 ? (center[dirs[i]] - s/2):(center[dirs[i]] + s/2 * sign)),
                        ~~(sign === 0 ? (center[dirs[i]] + s/2):(center[dirs[i]] + s/2 * sign)),
                        ~~(sign === 0 ? (center[dirs[i]] + s/4):(center[dirs[i]] + s/4 * sign)),
                        ~~(sign === 0 ? (center[dirs[i]] - s/4):(center[dirs[i]] + s/4 * sign)));
                    
                }

                ["top", "bottom"].forEach((k) => {
                    if (this.sideColors[i].position === k) {
                        if (config.neighborColors[k].right) {
                            positions.x[2] += s/4;
                        }

                        if (config.neighborColors[k].left) {
                            positions.x[3] -= s/4;
                        }
                    }
                });

                ["left", "right"].forEach((k) => {
                    if (this.sideColors[i].position === k) {
                        if (config.neighborColors[k].bottom) {
                            positions.y[2] += s/4;
                        }

                        if (config.neighborColors[k].top) {
                            positions.y[3] -= s/4;
                        }
                    }
                });

                this.positionsOfColorables.push(positions);
            }
        };
    }

    Block.prototype = Object.create(Box.prototype);

    Block.prototype.update = function () {

    };

    return Block;
})();

