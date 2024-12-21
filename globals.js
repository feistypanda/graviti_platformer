

// global variables
let click = false;
let keys = {};
let scene = 'play';

// some shtuff
let level, _camera;

// colors
let colors = {
    "red": -3644316,
    "green": -10172316,
    "blue": -10197816,
    "none": -10197916,
};

// block types

let blockTypes = (function () {
    return {
        "W": {name: "wall", color: -3618616, neededColored: []},
        "1": {name: "wall", color: -3618616, neededColored: ["top"]},
        "2": {name: "wall", color: -3618616, neededColored: ["left"]},
        "3": {name: "wall", color: -3618616, neededColored: ["bottom"]},
        "4": {name: "wall", color: -3618616, neededColored: ["right"]},
        "5": {name: "wall", color: -3618616, neededColored: ["top", "left"]},
        "6": {name: "wall", color: -3618616, neededColored: ["top", "bottom"]},
        "7": {name: "wall", color: -3618616, neededColored: ["top", "right"]},
        "8": {name: "wall", color: -3618616, neededColored: ["left", "bottom"]},
        "9": {name: "wall", color: -3618616, neededColored: ["left", "right"]},
        "0": {name: "wall", color: -3618616, neededColored: ["bottom", "right"]},
        ">": {name: "wall", color: -3618616, neededColored: ["bottom", "right", "top"]},
        "A": {name: "wall", color: -3618616, neededColored: ["left", "right", "top"]},
        "<": {name: "wall", color: -3618616, neededColored: ["bottom", "left", "top"]},
        "V": {name: "wall", color: -3618616, neededColored: ["bottom", "right", "left"]},
        "#": {name: "portal", color: -3618616},
        "R": {name: "color", color: colors.red, colorName: "red"},
        "G": {name: "color", color: colors.green, colorName: "green"},
        "B": {name: "color", color: colors.blue, colorName: "blue"},
    };
})();