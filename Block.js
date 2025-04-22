
// the blocks in the level
class Block extends Box  {
    constructor (config) {

        super (config);

        this.type = config.name;
        this.color = config.color;
        this.colorName = config.colorName;

        // if its a color block, store its color in this.colorName
        if (this.type === "color") this.colorName = config.colorName;

        // if it is a pressure pad, store its orientation and its state
        if (this.type === "pad") {

            this.connectedTo = config.connectedTo; // so I guess this is just the index in the 2d level array

            this.state = "up"; // is it pressed or not
            this.orientation = config.orientation; // yeah thats kinda obvi

            this.vertecies = {
                "x": [],
                "y": [],
            };

            this.pushedDownVertecies = {
                "x": [],
                "y": [],
            };

            let dirs = ["x", "y"];

            for (let i in dirs) {

                let direction = this.sides[this.orientation];
                let sign = Math.sign(direction[dirs[i]]);
                let s = this.dimensions.w;
                let center = this.getCenter();

                // calculate all of the verticies for drawing the shape
                this.vertecies[dirs[i]].push(
                    ~~(sign === 0 ? (center[dirs[i]] - s/2):(center[dirs[i]] + s/2 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] + s/2):(center[dirs[i]] + s/2 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] + s/4):(center[dirs[i]] + s/4 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] - s/4):(center[dirs[i]] + s/4 * sign)));

                this.pushedDownVertecies[dirs[i]].push(
                    ~~(sign === 0 ? (center[dirs[i]] - s/3):(center[dirs[i]] + s/2 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] + s/3):(center[dirs[i]] + s/2 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] + s/4):(center[dirs[i]] + s/2.5 * sign)),
                    ~~(sign === 0 ? (center[dirs[i]] - s/4):(center[dirs[i]] + s/2.5 * sign)));
                
            }
        }

        // if its a door make it start solid
        if (this.type === "door") this.solid = true;

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

                let center = this.getCenter();

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

    update () {
        if (this.type === "pad" && this.down) {
            this.connectedTo.solid = false;
        }
    }

    display () {
       
        processing.noStroke();
        processing.fill(this.color);

        if (this.type === "door" && !this.solid) processing.fill(processing.red(this.color), processing.green(this.color), processing.blue(this.color), 50)
        if (this.type === "pad") {

            processing.fill(this.color);

            // if this.connected to is still an index in the array of blocks
            if (typeof this.connectedTo === "number") {

                // make this.connectedTo a refrence to the object of the block in question
                this.connectedTo = level.currentLevel[this.connectedTo];

                // make the color darker so that the pads and doors stand out, not doing this in the editor bc the existing color system that I have works fine
                this.color = processing.color(processing.red(this.color) - 100, processing.green(this.color) - 100, processing.blue(this.color) - 100)

                // maek it so that the color of the door and its pad are the same
                this.connectedTo.color = this.color;
                this.connectedTo.colorName = this.colorName;
            }
            
            // im pretty sure this is useless but just leaving it here in case I am horribly wrong
            // if (!this.connectedCoords) {
                // this.connectedCoords = level.currentLevel[this.connectedTo].position  
            // };

            let vertecies = this.down ? this.pushedDownVertecies:this.vertecies;
            this.down = false;

            processing.beginShape();

            for (let i in vertecies.x) {
                
                processing.vertex(vertecies.x[i], vertecies.y[i]);
            }

            processing.endShape(processing.constants.CLOSE);
        } else {

            processing.rect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h);
        }

        if (this.type === "wall") {
            for (let i in this.positionsOfColorables) {

                processing.fill(colors[this.sideColors[i].color]);

                if (this.sideColors[i].color === "none"){

                    let c = colors[this.sideColors[i].colorNeeded];

                    processing.fill(
                        processing.red(c),
                        processing.green(c),
                        processing.blue(c),
                        100
                    );
                }
                
                processing.beginShape();

                for (let j in this.positionsOfColorables[i].x) {
                    
                    processing.vertex(this.positionsOfColorables[i].x[j], this.positionsOfColorables[i].y[j]);
                }

                processing.endShape(processing.constants.CLOSE);

            }
        }
    }

};

