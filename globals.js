// constants

let width = window.innerWidth;
let height = window.innerWidth;

const CONSTRAINING_DIMENSION = Math.min(width, height);
const OTHER_DIMENSION = Math.max(width, height);
const BLOCK_SIZE = 40;

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

// global variables
let click = false;
let keys = {};
let scene = 'play';

// player data
let playerData = {
    x: 200, y: 200,
    w: BLOCK_SIZE * 0.8, h: BLOCK_SIZE * 0.8,
};

let globalMouseX, globalMouseY, globalMouseButton;

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
        "W": {name: "wall", color: -3618616, neededColored: [], colorNeeded: []},
        "1": {name: "wall", color: -3618616, neededColored: ["top"], colorNeeded: []},
        "2": {name: "wall", color: -3618616, neededColored: ["left"], colorNeeded: []},
        "3": {name: "wall", color: -3618616, neededColored: ["bottom"], colorNeeded: []},
        "4": {name: "wall", color: -3618616, neededColored: ["right"], colorNeeded: []},
        "5": {name: "wall", color: -3618616, neededColored: ["top", "left"], colorNeeded: []},
        "6": {name: "wall", color: -3618616, neededColored: ["top", "bottom"], colorNeeded: []},
        "7": {name: "wall", color: -3618616, neededColored: ["top", "right"], colorNeeded: []},
        "8": {name: "wall", color: -3618616, neededColored: ["left", "bottom"], colorNeeded: []},
        "9": {name: "wall", color: -3618616, neededColored: ["left", "right"], colorNeeded: []},
        "0": {name: "wall", color: -3618616, neededColored: ["bottom", "right"], colorNeeded: []},
        ">": {name: "wall", color: -3618616, neededColored: ["bottom", "right", "top"], colorNeeded: []},
        "A": {name: "wall", color: -3618616, neededColored: ["left", "right", "top"], colorNeeded: []},
        "<": {name: "wall", color: -3618616, neededColored: ["bottom", "left", "top"], colorNeeded: []},
        "V": {name: "wall", color: -3618616, neededColored: ["bottom", "right", "left"], colorNeeded: []},
        "#": {name: "portal", color: -3618616},
        "C": {name: "color", color: colors.none, colorName: "none"},
        "R": {name: "color", color: colors.red, colorName: "red"},
        "G": {name: "color", color: colors.green, colorName: "green"},
        "B": {name: "color", color: colors.blue, colorName: "blue"},
    };
})();