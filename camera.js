Camera = (function () {
    function Camera(target) {

        // the subject of the camera, in this case its the player
        this.target = target;

        // set the starting position of the camera to the position of the target (player)
        this.position = vector.new(this.target.getCenter().x, this.target.getCenter().y);

        // the speeds at wich it lerps horizontally and vertically, they are different because you dont want jerky up and down
        this.lerpHorizontal = 0.1;
        this.lerpVertical = 0.05;

        // the vector used to lerp
        this.lerpAmt = vector.new(this.lerpHorizontal, this.lerpVertical);
    }

    Camera.prototype.run = function() {
        
        // lerp the camera to the target
        this.position.x = lerp(this.position.x, this.target.getCenter().x, this.lerpAmt.x);
        this.position.y = lerp(this.position.y, this.target.getCenter().y, this.lerpAmt.y);
    };

    return Camera;
})();
