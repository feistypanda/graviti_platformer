var programCode = function (processingInstance) {
with (processingInstance) {


// setup

angleMode = "radians";

size(600, 600);
smooth();
frameRate(60);

// lol i started making this b4 i knew about p5.js and now its too late
// so i can get pjs in other files
processing = (() => {
    return {

        lerp (...args) {
            return lerp(...args);
        },

        createGraphics(...args) {
            return createGraphics(...args);
        },

        image(...args) {
            return image(...args);
        },

        background(...args) {
            return background(...args);
        },

        noStroke(...args) {
            return noStroke(...args);
        },

        noFill(...args) {
            return noFill(...args);
        },

        rect(...args) {
            return rect(...args);
        },

        vertex(...args) {
            return vertex(...args);
        },

        beginShape(...args) {
            return beginShape(...args);
        },

        endShape(...args) {
            return endShape(...args);
        },

        fill(...args) {
            return fill(...args);
        },

        red(...args) {
            return red(...args);
        },

        green(...args) {
            return green(...args);
        },

        blue(...args) {
            return blue(...args);
        },

        color(...args) {
            return color(...args);
        },

        text(...args) {
            return text(...args);
        },

        textAlign(...args) {
            return textAlign(...args);
        },

        textFont(...args) {
            return textFont(...args);
        },

        createFont(...args) {
            return createFont(...args);
        },

        stroke(...args) {
            return stroke(...args);
        },

        strokeWeight(...args) {
            return strokeWeight(...args);
        },

        strokeJoin(...args) {
            return strokeJoin(...args);
        },

        polygon (xPos, yPos, numSides, radius, cornerRounding) {
        
            cornerRounding = cornerRounding || 0;

            let angleIncrement = (PI*2/numSides);

            if (cornerRounding === 0) {
                
                beginShape();

                for (let i = 0; i < numSides ; i ++) {
                    vertex (xPos + cos(i * angleIncrement) * radius, yPos + sin(i * angleIncrement) * radius);
                }

                endShape(CLOSE);
                return;
            }
            
            cornerRounding = constrain(cornerRounding, 0, sin((PI * (numSides - 2) / numSides)/2) * radius * 2);
            
            let cornerDist = radius - cornerRounding/cos(angleIncrement/2)/2;

            
            beginShape();
            
            // vertex (xPos + radius, yPos);
            
            for (let i = 0; i < numSides ; i ++) {
                
                let x = xPos + cos((i + 1) * angleIncrement) * radius;
                let y = yPos + sin((i + 1) * angleIncrement) * radius;
                
                let cornerRoundX = xPos + cos((i + 1) * angleIncrement) * cornerDist;
                let cornerRoundY = yPos + sin((i + 1) * angleIncrement) * cornerDist;
                
                // ellipse (cornerRoundX, cornerRoundY, cornerRounding, cornerRounding);
                
                arc (cornerRoundX, cornerRoundY, cornerRounding, cornerRounding, (i + 0.5) * angleIncrement, (i + 1.5) * angleIncrement)

                // let start = (i + 1) * angleIncrement;
                // let stop = (i + 2) * angleIncrement;
                // let totalAng = start - stop;

                // for (let j = 4; j >= 0; j --) {
                //     vertex(cornerRoundX + cos(start + j * (totalAng/6)) * cornerRounding/2, cornerRoundY + sin(start + j * (totalAng/6)) * cornerRounding/2);
                // }
                
                let xOffSet = cos((i + 1.5) * angleIncrement) * cornerRounding/2;
                let yOffSet = sin((i + 1.5) * angleIncrement) * cornerRounding/2;
                
                let x1 = cornerRoundX + xOffSet;
                let y1 = cornerRoundY + yOffSet;
                
                let x2 = (xPos + cos((i + 2) * angleIncrement) * cornerDist) + xOffSet
                let y2 = (yPos + sin((i + 2) * angleIncrement) * cornerDist) + yOffSet
                
                line (x1, y1, x2, y2);
                // vertex (x1, y1);
                // vertex (x2, y2);
            }
    
            endShape(); 
        },

        maxPolyRound: function (numSides, radius) {
            return sin((PI * (numSides - 2) / numSides)/2) * radius * 2;
        },

        pushMatrix(...args) {
            return pushMatrix(...args);
        },

        popMatrix(...args) {
            return popMatrix(...args);
        },

        translate(...args) {
            return translate(...args);
        },

        rotate(...args) {
            return rotate(...args);
        },

        ellipse(...args) {
            return ellipse(...args);
        },

        quad(...args) {
            return quad(...args);
        },

        atan2(...args) {
            return atan2(...args);
        },

        textSize(...args) {
            return textSize(...args);
        },

        lerpColor(...args) {
            return lerpColor(...args);
        },

        constants: PConstants,
    }
})();

// block stuff

filterBlockImages = (function() {
    
    function filterBlockImage (filterColor) {
        let darkColor = color(red(colors[filterColor]) - 100, green(colors[filterColor]) - 100, blue(colors[filterColor]) - 100);
        let g = createGraphics(200, 200);

        g.noStroke();
        g.fill(red(colors[filterColor]), green(colors[filterColor]), blue(colors[filterColor]), 50);
        g.rect(0, 0, 200, 200);
        g.stroke(darkColor);
        g.strokeWeight(40);

        for (let i = -150; i <= 150; i += 100) {
            g.line(i - 10, -10, i + 210, 210);
        }

        return g.get();

    }

    return {
        red: filterBlockImage("red"),
        green: filterBlockImage("green"),
        blue: filterBlockImage("blue"),
    };
})();

// camera stuff
(function() {
_camera = new Camera(player);
})();

// level stuff
(function() {

level.displayStuff = function() {

    fill(0, 0, 0, 200);
    textFont(createFont("Signika"), 35);
    textAlign(LEFT, CENTER);
    text(this.fillablesFilled + "/" + this.totalFillables, 85, 558);

    let [amt1, amt2, amt3] = [this.redFilled/this.totalFillables, this.greenFilled/this.totalFillables, this.blueFilled/this.totalFillables];

    this.displayProgress(45, 560, color(200, 100, 100), color(100, 200, 100), color(100, 100, 200), amt1, amt2, amt3);

    text(`level ${this.currentLevelInd + 1}`, 15, 500);

    //display the timer
    textAlign(RIGHT, CENTER);
    let times = this.getTime();
    text(utilities.stringifyTime(times[0]), 585, 558);
    text(utilities.stringifyTime(times[1]), 585, 518);
};

// for the progress ring
let g = createGraphics(600, 600, P2D);

level.displayProgress = function(x, y, color1, color2, color3, amt1, amt2, amt3) {
    g.noFill();

    g.strokeWeight(10);
    g.strokeCap(SQUARE);
    
    amt2 += amt1;
    amt3 += amt2;

    g.stroke (color1);
    g.fill (color1);
    g.arc (200, 200, 50, 50, -PI/2, amt1 * TWO_PI - PI/2);
    g.stroke (color2);
    g.fill (color2);
    g.arc (200, 200, 50, 50, amt1 * TWO_PI - PI/2, amt2 * TWO_PI - PI/2);
    g.stroke (color3);
    g.fill (color3);
    g.arc (200, 200, 50, 50, amt2 * TWO_PI - PI/2, amt3 * TWO_PI - PI/2);
    
    g.stroke (150);
    g.fill (150);
    g.arc (200, 200, 50, 50, amt3 * TWO_PI - PI/2, 1.5 * PI);

    let filling = g.get(170, 170, 60, 60);

    g.background(0, 0);
    g.stroke(255);
    g.ellipse(200, 200, 50, 50);

    let mask = g.get(170, 170, 60, 60);

    if (filling) {
        filling.mask(mask);
    }

    image(filling, x - 30, y - 30);
}

for (let i in levelData) {
    level.addLevel(levelData[i]);
}

level.fillLevel();
})();

// level transition stuff
(function() {

levelTransition.fade = function (amt) {
    pushStyle();
    noStroke();

    fill(255, 255 * amt);
    rect(0, 0, width, height);

    popStyle();
}

})();

buttons.add ({
    x: 200, y: 460, 
    width: 180, height: 120,
    color: color (200),
    textColor: color(50),
    text: "PLAY", textSize: 80,
    hoverTextColor: colors.green,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 35,
    scene: "menu", onclick: function() {
        scenes.nextTransition = ["play", (() => get()), 1];
    }
});

buttons.add ({
    x: 20, y: 460, 
    width: 160, height: 120,
    color: color (200),
    textColor: color(50),
    text: "EDIT", textSize: 80,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 35,
    scene: "menu", onclick: function() {
        scenes.nextTransition = ["edit", (() => get()), 1];
    }
});

buttons.add ({
    x: 400, y: 460, 
    width: 180, height: 120,
    color: color (200),
    textColor: color(50),
    text: "LEAD", textSize: 80,
    hoverTextColor: colors.blue,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 35,
    scene: "menu", onclick: function() {
        scenes.nextTransition = ["play", (() => get()), 1];
    }
});

buttons.add ({
    x: 10, y: 530, 
    width: 100, height: 60,
    color: color (200),
    textColor: color(50),
    text: "HOME", textSize: 40,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 17.5,
    hoverRotate: 0, hoverAnimScale: 0,
    scene: "edit", onclick: function() {
        scenes.nextTransition = ["menu", (() => get()), 1];
    }
});

buttons.add ({
    x: 460, y: 530, 
    width: 120, height: 60,
    color: color (200),
    textColor: color(50),
    text: "CLEAR", textSize: 40,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 17.5,
    hoverRotate: 0, hoverAnimScale: 0,
    scene: "edit", onclick: function() {
        levelEditor.blocks = [];
    }
});

buttons.add ({
    x: 200, y: 530, 
    width: 40, height: 60,
    color: color (200),
    textColor: color(50),
    text: "<", textSize: 40,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 17.5,
    hoverRotate: 0, hoverAnimScale: 0,
    scene: "edit", onclick: function() {
        levelEditor.currentBlock -= 1;
        if (levelEditor.currentBlock < 0) levelEditor.currentBlock = levelEditor.typesOfBlocks.length - 1;
    }
});


buttons.add ({
    x: 360, y: 530, 
    width: 40, height: 60,
    color: color (200),
    textColor: color(50),
    text: ">", textSize: 40,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 17.5,
    hoverRotate: 0, hoverAnimScale: 0,
    scene: "edit", onclick: function() {
        levelEditor.currentBlock = (levelEditor.currentBlock + 1) % levelEditor.typesOfBlocks.length;
    }
});

buttons.add ({
    x: 520, y: 20, 
    width: 60, height: 60,
    color: color (200),
    textColor: color(50),
    text: "HOME", textSize: 40,
    hoverTextColor: colors.red,
    borderColor: color(200), borderWeight: 0,
    borderRadius: 0, textYOffset: 17.5,
    hoverRotate: 0, hoverAnimScale: 0,
    scene: "play", onclick: function() {
        scenes.nextTransition = ["menu", (() => get()), 1];
    }
});
// scenes
scenes = (function() {

    let scene = "loading";

    let runCur = () => {
        scenes[scenes.scene]()
        if (scenes.nextTransition) {
            scenes.nextTransition[1] = scenes.nextTransition[1]();
            scenes.transition(...scenes.nextTransition)
        }
    };

    let play = (function () {
        function Play() {
            this.pastRotateAmt = 0;
            this.rotateAmt = 0;
            this.rotateLerp = 1;
        }

        Play.prototype.calcRotate = function () {
            this.rotateLerp = Math.min(this.rotateLerp + 0.12, 1);

            if (player.gravity.x > 0) {
                // if the rotation the previos frame isnt the rotation that the gravity indicates
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

        Play.prototype.translateWithRotate = function(translationScale = 1) {

            // all of the different translation ammounts
            let coord1 = ~~(-(-_camera.position.y + height/2 - player.dimensions.h/2));
            let coord2 = ~~(-_camera.position.x + width/2 - player.dimensions.w/2);
            let coord3 = ~~(-_camera.position.y + height/2 - player.dimensions.h/2);
            let coord4 = ~~(-(-_camera.position.x + width/2 - player.dimensions.w/2));

            // mish mash the values in a way that works
            let translate1 = vector.new(coord1, coord2);
            let translate2 = vector.new(coord3, coord4);
            let translate3 = vector.new(coord4, coord1);
            let translate4 = vector.new(coord2, coord3);

            // for each direction
            let translateMap = {
                1.5707963267948966: translate1, // PI/2
                4.71238898038469:   translate2, // PI * 1.5
                3.141592653589793:  translate3, // PI
                0:                  translate4, // 0
            };

            // lerp between now and last for smooth rotate
            translate(
                lerp(translateMap[this.rotateAmt].x, translateMap[this.pastRotateAmt].x, 1 - this.rotateLerp) * translationScale,
                lerp(translateMap[this.rotateAmt].y, translateMap[this.pastRotateAmt].y, 1 - this.rotateLerp) * translationScale
                );
        };

        Play.prototype.run = function () {

            //background
            background(240, 200);
            
            // background shapes
            pushMatrix();

                this.translateWithRotate(0.1);
            
                translate(width/2, height/2);

                this.doRotate();
                
                translate(-width/2, -height/2);

                backgroundHandler.run();

            popMatrix();

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

            level.runLevel();

            if (levelTransition.amt <= 1) {
                levelTransition.run();
            }

            buttons.run(mouseX, mouseY, click);
        }

        let playInst = new Play();

        return function(){playInst.run()};
    })();

    let menu = (() => {
        return function () {
            background (240, 200);

            backgroundHandler.run(true);

            image(images.title, 0, 0);

            buttons.run(mouseX, mouseY, click);
        }
    })();

    let edit = (() => {
        return function () {
            // update the positions of the mouse
            globalMouseX = mouseX - levelEditor.offset.x;
            globalMouseY = mouseY - levelEditor.offset.y;

            //clear the screed
            background(255);

            // run the edditor
            levelEditor.run();

            buttons.run(mouseX, mouseY, click);
        }
    })();

    let transition = (() => {

		let fromImg;
		let to = "";
		let amt = 0;
		let speed = 1;

		return function (_to, img, _speed) {

			amt += (Date.now() - then)/1000 * speed;
			
			if (_to) {

                // so the buttons can know to displayt themselves in the transition
                scenes.transitionTo = _to;

                // so we dont try to transition twice
                scenes.nextTransition = false;

				to = _to;
				fromImg = img;
				scenes.scene = "transition";
				amt = 0;

				if (_speed && _speed > 0) speed = _speed;
			}

			if (amt < 0.5) {
				image(fromImg, 0, 0, 600, 600);
			} else if (amt < 1){
				scenes[to]();
			} else {
				scenes.scene = to;
			}

			fill(200);
			noStroke();
			rect(-600 + 1200 * utilities.anim1(amt), 0, 600, 600);
		}
	})();

	let loading = (() => {

		let curInd = 0;
		let keys = Object.keys(images);

		return function () {
			background (240);

			// replace the functions in the image objects with what they return;
			images[keys[curInd]] = images[keys[curInd]]();

			let txt = (() => {

				if (curInd >= keys.length - 1) return "LOADED!";

				let res = "LOADING";
				for (let j = 0; j <= curInd / 2; j ++) {
					res += "."
				}
				return res;
			})();

			
			textSize(100);
			textFont(createFont('Anton'));
			fill(30);
			textAlign(CENTER, CENTER);

			text (txt, 300, 250);

			curInd ++;

			if (curInd >= keys.length) {
				scenes.transition("menu", get(), 0.9);
			}
		}
	})();

    return {play, menu, transition, loading, edit, scene, runCur, nextTransition: false,transitionTo: false,};
})();

// level editor display function

levelEditor.display = function() {

    // move the matrix for the panning camera
    pushMatrix();
    translate(this.offset.x, this.offset.y);

    // we dont want any stroke on our rects
    noStroke();

    fill (0, 20);

    if (mouseY < this.pannelY) rect (this.findBlockCoords()[0], this.findBlockCoords()[1], BLOCK_SIZE, BLOCK_SIZE);

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
        // if its a wire
        else if (block.name === "wire") {
            for (let i in block.nodes) {

                let [x, y] = [block.nodes[i][0] + BLOCK_SIZE/4, block.nodes[i][1] + BLOCK_SIZE/4]; 
                // rect in the middle
                rect (x, y, BLOCK_SIZE/2, BLOCK_SIZE/2);
                
                // connecting the nodes
                if (i > 0) {
                    rect(x, y, (block.nodes[i - 1][0] + BLOCK_SIZE * 3/4) - x,(block.nodes[i - 1][1] + BLOCK_SIZE * 3/4) - y);
                }
            }
        }

        if (block.name === "pad") {
            fill(0);
            text(block.connectedId, block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }

        if (block.name === "door" || block.name === "reverseDoor") {
            fill(0);
            text(block.id, block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }

        if (block.name === "text") {
            fill(0);
            textAlign(CENTER);
            textSize (20);
            text(block.text, block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }
        if (block.name === "filter") {
            fill(0);
            textAlign(CENTER);
            text("f", block.x + BLOCK_SIZE/2, block.y + BLOCK_SIZE/2);
        }
    }
    
    if (this.optionsOpen && !this.textInsertMenu) {

        var [mx, my] = [mouseX - this.offset.x, mouseY - this.offset.y];

        if (mx < this.optionsX || mx > this.optionsX + this.optionsWidth || my < this.optionsY || my > this.optionsY + this.optionsHeight) this.optionsOpen = false;

        noStroke();
        fill(200, 200);
        rect (this.optionsX, this.optionsY, this.optionsWidth, this.optionsHeight);
        let clickedNum = Math.floor((mouseY - this.offset.y - this.optionsY)/30);

        fill (100, 200);
        if (this.optionsOpen) rect (this.optionsX, this.optionsY + clickedNum * 30, this.optionsWidth, 30);

        for (let i = 0; i < this.optionsOptions.length; i ++) {
            const option = this.optionsOptions[i];

            fill (50);
            textSize (20);

            textAlign (CENTER, TOP);

            text (option.text, this.optionsX + this.optionsWidth/2, this.optionsY + 30 * i + 2);
        }

        if (click && globalMouseButton === LEFT) {
            this.optionsOptions[clickedNum].func();
        }
    }

    popMatrix();

    if (this.textInsertMenu) {
        fill(0, 100);
        rect (0, 0, 600, 600);

        fill (200);
        rect (120, 120, 360, 200);

        fill (240);

        rect (140, 140, 320, 80);


        if (keyPress) {
            if (keyCode === 10) {
                this.textInsertText += "\n";
            } else {
                this.textInsertText += key.toString();
            }
        }

        fill (20);
        textAlign (LEFT, TOP);
        textSize (12);
        text (this.textInsertText, 143, 143, 312, 80);

        const overB1 = (mouseX > 140 && mouseX < 380 && mouseY > 240 && mouseY < 300);
        const overB2 = (mouseX > 400 && mouseX < 460 && mouseY > 240 && mouseY < 300);

        fill (overB1 ? 150 : 220);
        rect (140, 240, 240, 60);
        fill (overB2 ? 150 : 220);
        rect (400, 240, 60, 60);

        textAlign (CENTER);
        textSize (40);
        fill (30);
        
        text ("APPLY", 260, 287);
        text ("X", 430, 287);

        if (click) {
            if (overB1) {
                this.textBlock.text = this.textInsertText;
                this.textInsertMenu = false;
            }
            if (overB2) {
                this.textInsertMenu = false;
            }
        }
    }

    fill(220, 150);
    rect(0, this.pannelY, 600, 600 - this.pannelY);
    fill(0);
    textAlign(LEFT, CENTER);
    text("selected: " + this.typesOfBlocks[this.currentBlock], 10, this.pannelY + (600 - this.pannelY)/2);

    fill(0, this.copyIndicator);
    textSize(40);
    textAlign(CENTER, CENTER);
    text ("copied level code", 300, 200);

    fill (20);

    text (this.typesOfBlocks[this.currentBlock], 300, 557);
};

// draw function

let then = Date.now();

draw = function () {
    globalMouseX = mouseX;
    globalMouseY = mouseY;

    scenes.runCur();

    click = false;
    keyPress = false;
    then = Date.now();
}

// user interactions

var keyPress = false;

keyPressed = () => {
    keys[keyCode] = keys[key.toString().toLowerCase()] = true;

    keyPress = true;
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
