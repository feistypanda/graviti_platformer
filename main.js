var programCode = function (processingInstance) {
with (processingInstance) {


// setup

angleMode = "radians";

size(600, 600);
smooth();
frameRate(60);

// so I can get pjs in other files
processing = (() => {
    return {
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

        constants: PConstants,
    }
})();

// camera stuff
(function() {
_camera = new Camera(player);
})();

// level stuff
(function() {

level.displayStuff = function() {

    fill(0, 0, 0);
    textFont(createFont("Signika"), 35);
    textAlign(LEFT, CENTER);
    text(this.fillablesFilled + "/" + this.totalFillables, 80, 558);

    let [amt1, amt2, amt3] = [this.redFilled/this.totalFillables, this.greenFilled/this.totalFillables, this.blueFilled/this.totalFillables];

    this.displayProgress(40, 560, color(200, 100, 100), color(100, 200, 100), color(100, 100, 200), amt1, amt2, amt3);
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
// scenes
scenes = (function() {
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
                1.5707963267948966: translate1, // PI/2
                4.71238898038469:   translate2, // PI * 1.5
                3.141592653589793:  translate3, // PI
                0:                  translate4, // 0
            };

            // lerp between now and last for smooth rotate
            translate(
                lerp(translateMap[this.rotateAmt].x, translateMap[this.pastRotateAmt].x, 1 - this.rotateLerp),
                lerp(translateMap[this.rotateAmt].y, translateMap[this.pastRotateAmt].y, 1 - this.rotateLerp)
                );
        };

        Play.prototype.run = function () {

            //background
            background(240, 200);

            backgroundHandler.run();

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
        }

        return new Play();
    })();

    scenesExists = true;
    return {
        play: play,
    };
})();

// draw function

draw = function () {
    globalMouseX = mouseX;
    globalMouseY = mouseY;

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
