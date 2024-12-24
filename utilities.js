// utility functions

function lerp(a, b, t) {
    return (a + (b-a) * t);
}

// shortcut to console.log

let log = (message) => {
    console.log(message);
}

// function min = Math.min;

let utilities = (function () {
    return {
        AABB: function(thing1, thing2) {

            let p1 = thing1.position;
            let p2 = thing2.position;

            let d1 = thing1.dimensions;
            let d2 = thing2.dimensions;

            // are they overlapping?
            return (p1.x + d1.w > p2.x) && (p1.y + d1.h > p2.y) && (p1.x < p2.x + d2.w) && (p1.y < p2.y + d2.h);
        },
    };
})();
