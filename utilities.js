// utility functions

function lerp(a, b, t) {
    return (a + (b-a) * t);
}

// shortcut to console.log

let log = (message) => {
    console.log(message);
}

let utilities = (function () {
    return {
        distSq(x1, y1, x2, y2) {
            return (x1 - y1) * (x1 - y1) + (x2 - y2) * (x2 - y2);
        },

        AABB: function(thing1, thing2) {

            let p1 = thing1.position;
            let p2 = thing2.position;

            let d1 = thing1.dimensions;
            let d2 = thing2.dimensions;

            // are they overlapping?
            return (p1.x + d1.w > p2.x) && (p1.y + d1.h > p2.y) && (p1.x < p2.x + d2.w) && (p1.y < p2.y + d2.h);
        },

        areaOfTri (triangle){

            let p = {...triangle};

            return Math.abs((p.x2 - p.x1) * (p.y3 - p.y1) - (p.x3 - p.x1) * (p.y2 - p.y1))
        },

        pointToTri (point, tri) {
            
            // the area of the real triangle
            let areaMain = utilities.areaOfTri(tri);

            let newTriangles = [
                {x1: point.x, y1: point.y, x2: tri.x1, y2: tri.y1, x3: tri.x2, y3: tri.y2},
                {x1: point.x, y1: point.y, x2: tri.x2, y2: tri.y2, x3: tri.x3, y3: tri.y3},
                {x1: point.x, y1: point.y, x2: tri.x3, y2: tri.y3, x3: tri.x1, y3: tri.y1},
            ];

            // find the sum of the areas created by the point and the vertecies of the main triangle
            let totalArea = (function() {
                let total = 0;
                for (let i of newTriangles) {
                    total += utilities.areaOfTri(i);
                }
                return total;
            })();
            return totalArea <= areaMain;
        },

        copyObj (obj) {
            return JSON.parse(JSON.stringify(obj));
        }

    };
})();
