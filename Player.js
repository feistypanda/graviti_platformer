Player = (function () {
    function Player(config) {

        // inherit from box
        Box.call(this, config);

        // nickname, to be used as just a name ig
        this.nickname = "Player1";

        // health of the player, maybe I'll add spikes or smth at some point
        this.health = 100;

        // how powerfull is the horizontal movement
        this.movementPower = 5.5;

        // the time it takes before you can jump twice so that if you hold down jump it isnt nauseating
        this.jumpDelay = 0;

        // the power of the gravity
        this.gravityPower = 1.3;

        // the vector of the gravity, is changed with the changing gravity
        this.gravity = vector.new(0, this.gravityPower);

        // how hard can the player jump?
        this.jumpPower = 19.7;

        // so that you cant jump in midair
        this.canJump = false;

        // horizontal and vertical friction, different so that the air dosent feel like honey when you jump
        this.frictionHorizontal = 0.4;
        this.frictionVertical = 0.999;

        // friction vector, changes with the gravity. not actually a vector, just a way to keep track of the friction in different directions
        this.friction = vector.new(this.frictionHorizontal, this.frictionVertical);

        // so that you can still jump right after falling off of a block
        this.startingCoyoteTime = 4;
        this.coyoteFrames = this.startingCoyoteTime;

        // an array with all of the blocks the player is currently coliding with
        this.colidingWith = [];

        // the color of the player
        this.colorName = "none";
    }

    // inherit prototype
    Player.prototype = Object.create(Box.prototype);

    Player.prototype.reset = function(x, y) {

        // reset everything

        this.canJump = false;

        this.startingCoyoteTime = 4;
        this.coyoteFrames = this.startingCoyoteTime;

        this.colidingWith = [];

        this.colorName = "none";

        this.gravity = vector.new(0, this.gravityPower);

        this.velocity = vector.new(0, 0);
        this.position = vector.new(x, y);
    };

    Player.prototype.moveX = function () {

        // move x
        this.position.x += this.velocity.x;

        // friction x
        this.velocity.x *= this.friction.x;
    };

    Player.prototype.moveY = function () {

        // move y
        this.position.y += this.velocity.y;

        // friction y
        this.velocity.y *= this.friction.y;
    };

    Player.prototype.move = function () {

        // set the jumping to false, set to true later if on top of a block
        this.canJump = false;

        // reduce the coyote frames, reset later if ontop of a block
        this.coyoteFrames --;

        // do the collisions on each axis seperately to prevent glitches. so you move on the x axis and then check for colisions, then you move on the y axis and do the same

        // move x
        this.moveX();

        // check for colisions on the x axis directly after moving along the x axis
        this.colisions("x");

        // move on the y axis
        this.moveY();

        // check for colisions on the y axis directly after moving along the y axis
        this.colisions("y");
    };

    Player.prototype.colisions = function(direc) {

        // check for colisions and fill the this.colidingWith array
        this.checkColisions();

        // if were colliding with anything, resolve the colisions
        if (this.colidingWith.length > 0) {

            // use the direc to communicate if these colisions are on the x or y axis
            this.resolveColisions(direc);
        }
    };

    Player.prototype.checkColisions = function () {
        this.colidingWith = [];

        for (var i in level.currentLevel) {
            if (level.currentLevel[i] && this.coliding(level.currentLevel[i])) {
                this.colidingWith.push(level.currentLevel[i]);
            }
        }
    };

    Player.prototype.resolveColisions = function (direc) {

        let direcToDimensionMap = {
            "x": "w",
            "y": "h",
        };

        let direcs = ["x", "y"];
        let opositeDirec = direcs[(direcs.indexOf(direc) + 1)%direcs.length]

        let toBeVelocity = vector.clone(this.velocity);

        for (let i in this.colidingWith) {

            let sideOfCollision = (() => {
                if (direc === "x") {
                    if (this.velocity[direc] > 0) {
                        return "left";
                    } else if (this.velocity[direc] < 0) {
                        return "right";
                    }
                } else if (direc === "y") {
                    if (this.velocity[direc] > 0) {
                        return "top";
                    } else if (this.velocity[direc] < 0) {
                        return "bottom";
                    }
                }
            })();

            // shortcut to make less typing
            let b = this.colidingWith[i];

            // get the center of the square on the axis that were coliding on
            let center = this.getCenter()[opositeDirec];
            let centerOver = (center > b.position[opositeDirec] && center < b.position[opositeDirec] + b.dimensions[direcToDimensionMap[opositeDirec]]);

            if (b.type === "color") {

                // switch the gravity of the player, change the color of the player, and change the friction on the player and the camera speed
                // if the center of the player is colliding or this is the only block were coliding with
                if (centerOver || this.colidingWith.length <= 1) {
                    this.colorName = b.colorName;
                    this.gravity = (() => {
                        switch (sideOfCollision) {
                        case "top":

                            this.friction = vector.new(this.frictionHorizontal, this.frictionVertical);
                            _camera.lerpAmt = vector.new(_camera.lerpHorizontal, _camera.lerpVertical);
                            return vector.new(0, this.gravityPower);

                        case "bottom":

                            this.friction = vector.new(this.frictionHorizontal, this.frictionVertical);
                            _camera.lerpAmt = vector.new(_camera.lerpHorizontal, _camera.lerpVertical);
                            return vector.new(0, -this.gravityPower);

                        case "left":

                            this.friction = vector.new(this.frictionVertical, this.frictionHorizontal);
                            _camera.lerpAmt = vector.new(_camera.lerpVertical, _camera.lerpHorizontal);
                            return vector.new(this.gravityPower, 0);

                        case "right":

                            this.friction = vector.new(this.frictionVertical, this.frictionHorizontal);
                            _camera.lerpAmt = vector.new(_camera.lerpVertical, _camera.lerpHorizontal);
                            return vector.new(-this.gravityPower, 0);

                        } 
                    })();
                }
            }

            if (b.type === "wall" && (centerOver || this.colidingWith.length <= 1)) {
                // loop through the colorable sides on the wall were colliding with
                b.sideColors.forEach((k, i) => {

                    // if the side were looping over is the same side of the colision AND the color of the player is the color that this side needs to be
                    if (sideOfCollision === k.position && this.colorName === b.sideColors[i].colorNeeded) {
                        b.sideColors[i].color = this.colorName;
                    }
                });
            }

            ["top", "bottom", "left", "right"].forEach((k) => {
                if (sideOfCollision === k && (Math.sign(this.gravity.y) === -this.sides[k].y && Math.sign(this.gravity.x) === -this.sides[k].x)) {
                    // allow jumping because landed on top of a block
                    this.canJump = true;
                    this.coyoteFrames = this.startingCoyoteTime;
                }
            })

            if (this.velocity[direc] > 0) {

                this.position[direc] = b.position[direc] - this.dimensions[direcToDimensionMap[direc]];
                toBeVelocity[direc] = 0;

            } else if (this.velocity[direc] < 0) {

                this.position[direc] = b.position[direc] + b.dimensions[direcToDimensionMap[direc]];
                toBeVelocity[direc] = 0;

            }
        }

        this.velocity = toBeVelocity;
    };

    Player.prototype.update = function () {

        this.jumpDelay --;

        if (keys[LEFT] || keys.a) {

            this.velocity.x -= this.movementPower * Math.sign(this.gravity.y);
            this.velocity.y += this.movementPower * Math.sign(this.gravity.x);

        }

        if (keys[RIGHT] || keys.d) {

            this.velocity.x += this.movementPower * Math.sign(this.gravity.y);
            this.velocity.y -= this.movementPower * Math.sign(this.gravity.x);

        }

        //  && (this.canJump || this.coyoteFrames > 0)

        if ((keys[UP] || keys.w) && (this.canJump || this.coyoteFrames > 0) && this.jumpDelay <= 0) {  

            this.jumpDelay = 10;

            if (Math.sign(this.gravity.y)) {

                if (this.coyoteFrames > 0) {
                    this.velocity.y = 0;
                }

                this.canJump = false;
                this.coyoteFrames = 0;

                this.velocity.y -= this.jumpPower * Math.sign(this.gravity.y);
            }

            if (Math.sign(this.gravity.x)) {

                if (this.coyoteFrames > 0) {
                    this.velocity.x = 0;
                }

                this.canJump = false;
                this.coyoteFrames = 0;
                
                this.velocity.x -= this.jumpPower * Math.sign(this.gravity.x);
            }

        }

        this.velocity = vector.add(this.velocity, this.gravity);

        this.move();
        this.color = colors[this.colorName];
    };

    
    return Player;
})();