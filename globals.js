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

let scenesExists = false;
let click = false;
let keys = {};
let scene = 'menu';
let processing;
let filterBlockImages;
let particles;

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

const wallColor = -3618616;

// block types
let blockTypes = (function () {
    return {

        "wall": {name: "wall", color: wallColor, neededColored: [], colorNeeded: []},
        "spawn": {name: "spawn", color: 854916961},
        "pad": {name: "pad", color: colors.none, connectedId: 0, colorName: "none", orientation: "top"},
        "color": {name: "color", color: colors.none, colorName: "none"},
        "door": {name: "door", id: 0, color: colors.none, colorName: "none"},
        "reverseDoor": {name: "reverseDoor", id: 0, color: colors.none, colorName: "none"},
        "text": {name: "text", color: colors.none, colorName: "none", text: ""},
        "filter": {name: "filter", color: colors.none, colorName: "none"},
    };
})();