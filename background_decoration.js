class BackgroundShape {
    constructor (config) {
        
        this.position = new PVector(config.x, config.y);
        this.velocity = new PVector(config.vx, config.vy);

        this.angle = Math.random() * Math.PI * 2;
        this.angularVelocity = Math.random() *  Math.PI/75 - Math.PI/150;

        this.lifeTime = 60 * 10;

        this.sides = Math.round(Math.random() * 4 + 3);
        this.size = Math.random() * 70 + 30;

        this.color = config.color;
    }

    update () {
        this.position.add(this.velocity)
        
        this.angle += this.angularVelocity;

        this.lifeTime --;

        return this;
    }

    display () {
        
        for (let j = 1; j <= 2; j ++) {

            processing.stroke(processing.red(this.color), processing.green(this.color), processing.blue(this.color), (j < 2 ? 100 : 255) * (this.lifeTime/(60 * 10)));
            processing.strokeWeight(j < 2 ? 10 : 7);
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

    run () {

        if (Math.random() < 0.1) {
            this.addRandom();
        }

        for (let i = this.shapes.length - 1; i >= 0; i --) {
            this.shapes[i].run();
            if (this.shapes[i].lifeTime <= 0 || this.shapes.length > 100) {
                this.shapes.splice(i, 1);
            }
        }
    },

    addRandom () {

        let ang = Math.random() *  100;

        this.shapes.push(new BackgroundShape({
            x: 300 + Math.cos(ang) * 500,
            y: 300 + Math.sin(ang) * 500,
            
            vx: Math.random () * 2 - 1,
            vy: Math.random () * 2 - 1,

            color: (function() {
                // let g = processing.createGraphics(processing.constants.width, processing.constants.height);

                // g.colorMode(g.HSB);

                // let col = g.color(Math.random() * 255 , 200, 200);

                // g.colorMode(g.RGB);

                // return g.color(g.red(col), g.green(col), g.blue(col));

                return [-3644316, -10172316, -10197816][Math.floor(Math.random() * 3)];
            })()
        }));
    },
}