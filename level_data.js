// 1: ["top"]
// 2: ["left"]
// 3: ["bottom"]
// 4: ["right"]
// 5: ["top", "left"]
// 6: ["top", "bottom"]
// 7: ["top", "right"]
// 8: ["left", "bottom"]
// 9: ["left", "right"]
// 0: ["bottom", "right"]
// >: ["bottom", "right", "top"]
// A: ["left", "right", "top"]
// <: ["bottom", "left", "top"]
// V: ["bottom", "right", "left"]
// #: portal
// R: red color
// G: green color
// B: blue color
// @: spawn 


let levelData = [[
    "  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWGWWW",
    "WWWWW                                W",
    "W    W                                W",
    "W WW W@ W                              W",
    "W WW WWW                                W",
    "W WW                                    W",
    "W WWRWW          WW                     W",
    "W WWWWW           W                     W",
    "W WWRWW           W    A                W",
    "W     W        WWWB    9                W",
    "W WW          G        9                W",
    "W WWWR66661111W66666666366666666WWWWWWWW",
    "W                                W",
    "W                                W",
    "W                                W",
    "W                                W",
    "W  W",
    "W1WW WWWWW661666666666666666666WWWW",
    "WWWW  W  W  V",
    "WWWW  W",
    "WWWW  W",
    "WWWW  W",
    "WWWW  W",
    "WWWW  W",
    "WWWW  W",
    "WWWW  W",
    "WWWW   ",
    "WWWWWWWW",],
    [[{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["red"],"x":160,"y":-120}],[],[],[],[],[" ",{"name":"spawn","color":854916961,"x":240,"y":80}],[],[" ",{"name":"color","color":-3644316,"colorName":"red","x":200,"y":160},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":240,"y":160},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":280,"y":160},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":320,"y":160},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":360,"y":160},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":400,"y":160}],[],[{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":160,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":200,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":240,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":280,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":320,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":360,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":400,"y":240},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":440,"y":240}]],
];



