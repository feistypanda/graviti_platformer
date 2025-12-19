class Particle {
    constructor (config) {
        // position and velocity
        this.position = vector.new(config.x || 0, config.y || 0);
        this.velocity = vector.new(config.vx || 0, config.vy || 0);
        this.angle = 0;
        this.angularVelocity = config.angularVelocity || 0;
        
        // appearance
        this.sides = config.sides || Math.floor(Math.random() * 4 + 2.1); // number of sides of the polygon
        this.radius = config.radius || 5;
        this.color = config.color || processing.color(255, 0, 0);

        //misc
        this.maxLifetime = config.lifetime || 60;
        this.lifetime = this.maxLifetime;
        this.fade = config.fade !== false ? true : false;
        this.affectedByGravity = config.affectedByGravity || false;
    }

    update () {
        
        if (this.affectedByGravity) this.velocity = vector.add(this.velocity, vector.mult(player.gravity, 0.05));
        this.position = vector.add(this.position, this.velocity);
        this.angle = this.angle + this.angularVelocity;

        this.lifetime --;

        return this;
    }

    display () {

        // if the particle should fade away, then set the color to the current color but with an opacity relating to the lifetime
        if (this.fade) this.color = processing.color(processing.red(this.color), processing.green(this.color), processing.blue(this.color), 255 * this.lifetime/this.maxLifetime);

        processing.noStroke();
        processing.fill(this.color);

        processing.pushMatrix();
        processing.translate(this.position.x, this.position.y);
        processing.rotate(this.angle);

        processing.polygon(0, 0, this.sides, this.radius)

        processing.popMatrix();

        return this;
    }

    run () {
        this.update().display();
    }
}

particles = {
    particles: [],

    run () {
        for (let i = this.particles.length - 1; i >= 0; i --) {
            this.particles[i].run();
            if (this.particles.lifetime < 0) this.particles.splice(i, 1);
        }
    },

    add (config) {
        this.particles.push(new Particle(config));
    },
};