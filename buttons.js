let buttons = (() => {
    class Button {
        constructor (config) {
            this.x = config.x || 0;
            this.y = config.y || 0;
            this.width = config.width || 20;
            this.height = config.height || 20;

            // hover animation stuff
            this.hoverScale = config.hoverAnimScale ?? 0.1;
            this.maxWidth = this.width * (1 + this.hoverScale);
            this.startWidth = this.width;
            this.minX = this.x - this.width * this.hoverScale / 2;
            this.maxX = this.x;
            this.angle = 0;
            this.minAngle = 0;
            this.maxAngle = config.hoverRotate ?? Math.PI/46;

            this.color = config.color || color(255);
            this.borderColor = config.borderColor || color (0);
            this.borderWeight = config.borderWeight || 1;
            this.borderRadius = config.borderRadius || 0;

            this.text = config.text || "filler";
            this.textSize = config.textSize || 20;
            this.textYOffset = config.textYOffset || 0;
            this.textColor = config.textColor || color (0);

            this.unhoverTextColor = this.textColor;
            this.hoverTextColor = config.hoverTextColor || this.textColor;

            this.onclick = config.onclick || function(){};
            this.scene = config.scene || "menu"; // keep track of this so that the button does not click when it is not being displayed
        }

        display () {

            processing.pushMatrix ();
            processing.translate (this.x + this.width/2, this.y + this.height/2);
            processing.rotate (this.angle);

            processing.fill (this.color);
            processing.stroke (this.borderColor);
            processing.strokeWeight (this.borderWeight);
            processing.rect (-this.width/2, -this.height/2, this.width, this.height, this.borderRadius);

            processing.noStroke ();
            processing.fill (this.textColor)
            processing.textSize(this.textSize);
            processing.textAlign(processing.constants.CENTER,processing.constants.BASELINE);
            processing.text (this.text, 0, this.textYOffset);

            processing.popMatrix();

            return this;
        }

        onHover (mx, my) {

            const lerpSpeed = 0.3;

            if (this.mouseOver(mx, my)) {
                this.width = processing.lerp(this.width, this.maxWidth, lerpSpeed);
                this.x = processing.lerp(this.x, this.minX, lerpSpeed);
                this.angle = processing.lerp(this.angle, this.maxAngle, lerpSpeed);
                this.textColor = processing.lerpColor(this.textColor, this.hoverTextColor, lerpSpeed);
            }
            if (!this.mouseOver(mx, my)) {
                this.textColor = processing.lerpColor(this.textColor, this.unhoverTextColor, lerpSpeed);
                this.width = processing.lerp(this.width, this.startWidth, lerpSpeed);
                this.x = processing.lerp(this.x, this.maxX, lerpSpeed);
                this.angle = processing.lerp(this.angle, this.minAngle, lerpSpeed);
            }
        }

        update (mx, my, click) {

            this.onHover(mx, my);
            if (click && this.mouseOver(mx, my)) this.onclick();
            return this;
        }

        mouseOver (mouseX, mouseY) {
            return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
        }

        run (mx, my, click) {
            this.update(mx, my, click).display();
        }
    }

    return {
        buttons: [],

        run (mx, my, click) {
            for (let i of this.buttons) {
                if (scenes.scene === i.scene || scenes.transitionTo === i.scene) i.run(mx, my, click);
            }
        },

        add (config) {
            this.buttons.push (new Button (config));
        }
    }
})();