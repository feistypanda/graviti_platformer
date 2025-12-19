// vectors

let vector = (function () {
    let vector = {}

    vector.new = (x, y) => {
        return {x: x, y: y};
    }

    vector.add = (vec1, vec2) => {
        return vector.new(vec1.x + vec2.x, vec1.y + vec2.y);
    }

    vector.mult = (vec, amt) => {
        return vector.new(vec.x * amt, vec.y * amt);
    }

    vector.sub = (vec1, vec2) => {
        return vector.new(vec1.x - vec2.x, vec1.y - vec2.y);
    }

    vector.clone = (vec) => {
        return vector.new(vec.x, vec.y);
    }

    vector.lerp = (vec1, vec2, amt) => {
        return vector.new(lerp(vec1.x, vec2.x, amt), lerp(vec1.y, vec2.y, amt));
    }

    vector.mag = (vec) => {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    return vector;
})();