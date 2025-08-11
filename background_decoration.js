class BackgroundShape {
    constructor (config) {
        
        this.position = new PVector(config.x, config.y);
        this.velocity = new PVector(config.vx, config.vy);

        this.angle = Math.random() * Math.PI * 2;
        this.angularVelocity = Math.random() *  Math.PI/75 - Math.PI/150;

        this.timeBetweenInScreenChecks = 60 * 10;

        this.distance = Math.random() * 40 + 30
        this.sides = Math.round(Math.random() * 4 + 3);
        this.size = Math.random() * 70 + 30;

        this.color = config.color;
    }

    update () {
        this.position.add(this.velocity)
        
        this.angle += this.angularVelocity;

        this.timeBetweenInScreenChecks --;

        return this;
    }

    display () {
        
        for (let j = 1; j <= 2; j ++) {

            processing.stroke(processing.red(this.color), processing.green(this.color), processing.blue(this.color), (j < 2 ? 100 : 255) - this.distance * 3 + 25);
            processing.strokeWeight(j < 2 ? 15 : 10);
            processing.noFill();
            processing.strokeJoin(processing.constants.ROUND);

            processing.beginShape();

            for (let i = 0; i <= this.sides; i ++) {
                
                processing.vertex(this.position.x + Math.cos(Math.PI*2/this.sides * i + this.angle) * this.size, this.position.y + Math.sin(Math.PI*2/this.sides * i + this.angle) * this.size);

            }

            processing.endShape(processing.constants.CLOSE);
        }
    }

    run () {
        this.update().display();
    }
}

let backgroundHandler = {
    shapes: [],

    run (distRange) {
        if (Math.random() < 0.1/3 / 10) { // this function is called ten times a frame, so this.addrandom happens every 30 frames ish
            this.addRandom();
        }

        for (let i = this.shapes.length - 1; i >= 0; i --) {
            if (10 - Math.round((this.shapes[i].distance - 30)/4) === distRange) {
                this.shapes[i].run();
                if (this.shapes[i].timeBetweenInScreenChecks <= 0) {
                    if (this.shapes[i].position.x > -100 && this.shapes[i].position.x < 700 && this.shapes[i].position.y > -100 && this.shapes[i].position.y < 700) {
                        this.shapes.lifeTime = 60 * 10;
                    } else {
                        this.shapes.splice(i, 1);
                    }
                }
            }
        }
    },

    addRandom () {
        let ang = Math.random() *  100;

        this.shapes.push(new BackgroundShape({
            x: player.position.x + Math.cos(ang) * 600,
            y: player.position.y + Math.sin(ang) * 600,
            
            vx: Math.random () * 2 - 1,
            vy: Math.random () * 2 - 1,

            color: (function() { return [-3644316, -10172316, -10197816][Math.floor(Math.random() * 3)];})()
        }));
    },
}