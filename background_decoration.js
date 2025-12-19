class BackgroundShape {
    constructor (config) {
        
        this.position = new PVector(config.x, config.y);
        this.velocity = new PVector(config.vx, config.vy);

        this.angle = Math.random() * Math.PI * 2;
        this.angularVelocity = Math.random() *  Math.PI/75 - Math.PI/150;

        this.lifeTime = 600;

        this.sides = Math.round(Math.random() * 4 + 3);
        this.size = Math.random() * 35 + 15;

        this.color = config.color;
    }

    update () {
        this.position.add(this.velocity)
        
        this.angle += this.angularVelocity;

        this.lifeTime --;

        return this;
    }

    display () {

        processing.stroke(this.color);
        processing.strokeWeight(10);
        processing.noFill();
        processing.strokeJoin(processing.constants.ROUND);
        
        processing.pushMatrix();
        processing.translate(this.position.x, this.position.y);
        processing.rotate(this.angle);

        processing.polygon(0, 0, this.sides, this.size - utilities.cosify(0.5 - Math.abs(this.lifeTime - 300)/600) * this.size, processing.maxPolyRound(this.sides, this.size) * utilities.cosify(0.5 - Math.abs(this.lifeTime - 300)/600));
        processing.popMatrix();

    }

    run () {
        
        this.update().display();
    }
}

let backgroundHandler = {
    shapes: [],

    run () {
        if (Math.random() < 0.1/3 / 10) { // this function is called ten times a frame, so this.addrandom happens every 30 frames ish
            
            this.addRandom();
        }

        for (let i = this.shapes.length - 1; i >= 0; i --) {
            this.shapes[i].run();
            if (this.shapes[i].lifeTime < 0) {
                this.shapes.splice(i, 1);
            } 
        }
    },

    addRandom () {

        this.shapes.push(new BackgroundShape({
            x: player.position.x + Math.random() * 600 - 300,
            y: player.position.y + Math.random() * 600 - 300,
            
            vx: Math.random () * 0.5 - 0.25,
            vy: Math.random () * 0.5 - 0.25,

            color: (function() { return [-2183763, -5382483, -5394978][Math.floor(Math.random() * 3)];})()
        }));
    },
}