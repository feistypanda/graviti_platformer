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
    "WWWWWWWW",
],[[{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":80,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":120,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":160,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":200,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":240,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":280,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":320,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":360,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":400,"y":-80},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":440,"y":-80}],[],[{"name":"wall","color":-3618616,"neededColored":["top","left"],"colorNeeded":["green","green"],"x":120,"y":0},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["green","red"],"x":160,"y":0},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["green","red"],"x":200,"y":0},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["green","red"],"x":240,"y":0},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["green","red"],"x":280,"y":0},{"name":"wall","color":-3618616,"neededColored":["bottom","top"],"colorNeeded":["red","green"],"x":320,"y":0},{"name":"wall","color":-3618616,"neededColored":["bottom","top"],"colorNeeded":["red","green"],"x":360,"y":0},{"name":"wall","color":-3618616,"neededColored":["top","right"],"colorNeeded":["green","green"],"x":400,"y":0}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","red"],"x":120,"y":40}," "," "," "," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left"],"colorNeeded":["red"],"x":400,"y":40},{"name":"wall","color":-3618616,"neededColored":["bottom","top","right"],"colorNeeded":["green","green","green"],"x":440,"y":40}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","red"],"x":120,"y":80}," "," "," "," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["red","green"],"x":400,"y":80}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","red"],"x":120,"y":120}," ",{"name":"color","color":-10197816,"colorName":"blue","x":200,"y":120}," ",{"name":"wall","color":-3618616,"neededColored":["top","left"],"colorNeeded":["red","red"],"x":280,"y":120},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":320,"y":120},{"name":"wall","color":-3618616,"neededColored":["top"],"colorNeeded":["red"],"x":360,"y":120},{"name":"wall","color":-3618616,"neededColored":["right"],"colorNeeded":["green"],"x":400,"y":120}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","red"],"x":120,"y":160}," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left"],"colorNeeded":["red"],"x":280,"y":160},{"name":"color","color":-10172316,"colorName":"green","x":320,"y":160},{"name":"color","color":-10172316,"colorName":"green","x":360,"y":160},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":400,"y":160},{"name":"wall","color":-3618616,"neededColored":["top","right","bottom"],"colorNeeded":["green","green","green"],"x":440,"y":160}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","red"],"x":120,"y":200}," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left","bottom"],"colorNeeded":["red","red"],"x":280,"y":200}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","blue"],"x":120,"y":240}," "," "," "," "," "," ",{"name":"wall","color":-3618616,"neededColored":["right","top"],"colorNeeded":["green","green"],"x":400,"y":240}],[{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["green","blue"],"x":120,"y":280}," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left","top"],"colorNeeded":["blue","blue"],"x":280,"y":280},{"name":"color","color":-10172316,"colorName":"green","x":320,"y":280},{"name":"color","color":-10172316,"colorName":"green","x":360,"y":280},{"name":"wall","color":-3618616,"neededColored":[],"colorNeeded":[],"x":400,"y":280},{"name":"wall","color":-3618616,"neededColored":["right","bottom","top"],"colorNeeded":["green","green","green"],"x":440,"y":280}],[{"name":"wall","color":-3618616,"neededColored":["right"],"colorNeeded":["blue"],"x":120,"y":320}," ",{"name":"color","color":-3644316,"colorName":"red","x":200,"y":320}," ",{"name":"wall","color":-3618616,"neededColored":["bottom","left"],"colorNeeded":["blue","blue"],"x":280,"y":320},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["blue"],"x":320,"y":320},{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["blue"],"x":360,"y":320},{"name":"wall","color":-3618616,"neededColored":["right"],"colorNeeded":["green"],"x":400,"y":320}],[{"name":"wall","color":-3618616,"neededColored":["right"],"colorNeeded":["blue"],"x":120,"y":360}," "," "," "," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left","right"],"colorNeeded":["blue","green"],"x":400,"y":360}],[{"name":"wall","color":-3618616,"neededColored":["right"],"colorNeeded":["blue"],"x":120,"y":400}," "," "," "," "," "," ",{"name":"wall","color":-3618616,"neededColored":["left"],"colorNeeded":["blue"],"x":400,"y":400},{"name":"wall","color":-3618616,"neededColored":["top","right","bottom"],"colorNeeded":["green","green","green"],"x":440,"y":400}],[{"name":"wall","color":-3618616,"neededColored":["bottom"],"colorNeeded":["green"],"x":120,"y":440},{"name":"wall","color":-3618616,"neededColored":["bottom","top"],"colorNeeded":["green","blue"],"x":160,"y":440},{"name":"wall","color":-3618616,"neededColored":["bottom","top"],"colorNeeded":["green","blue"],"x":200,"y":440},{"name":"wall","color":-3618616,"neededColored":["bottom","top"],"colorNeeded":["green","blue"],"x":240,"y":440},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["blue","green"],"x":280,"y":440},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["blue","green"],"x":320,"y":440},{"name":"wall","color":-3618616,"neededColored":["top","bottom"],"colorNeeded":["blue","green"],"x":360,"y":440},{"name":"wall","color":-3618616,"neededColored":["right","bottom"],"colorNeeded":["green","green"],"x":400,"y":440}]]];