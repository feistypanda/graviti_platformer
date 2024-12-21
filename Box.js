// Box is the main constructor that both Block and Player inherit from
let Box = (function () {

    function Box(config) {

        // sides
        this.sides = {
            "left": vector.new(-1, 0),
            "right": vector.new(1, 0),
            "top": vector.new(0, -1),
            "bottom": vector.new(0, 1),
        };


        // position
        this.position = {x: config.x, y: config.y};

        // velocity
        this.velocity = {x: 0, y:0}

        // dimensions
        this.dimensions = {w: config.w, h: config.h};
    }

    Box.prototype.getCenter = function() {
        return vector.new(this.position.x + this.dimensions.w/2, this.position.y + this.dimensions.h/2);
    };

    Box.prototype.run = function () {

        // update the box
        this.update();

        // run the box
        this.display();
    };

    Box.prototype.coliding = function (other) {
        return utilities.AABB(this, other);
    }

    // return the Box constructor to the golbal variable 'Box'
    return Box;
})();
