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