class Button {
    constructor (config) {
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;

        this.color = config.color;
        this.borderColor = config.borderColor;
        this.borderWeight = config.borderWeight;

        this.text = config.text;
        this.textSize = config.textSize;

        this.onclick = config.onclick;
        this.scene = config.scene; // keep track of this so that the button does not click when it is not being displayed
    }

    isMouseOver (mouseX, mouseY) {
        return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }

    run (mx, my, click) {
        return this.update(mx, my, click).display();
    }

    update () {
        if (click && this.isMouseOver(mx, my) && scene === this.scene) this.onclick();
        return this;
    }

    display () {
        return this;
    }
}

let buttons = (() => {
    return {
        buttons: [],
        
        run (mx, my, click) {
            for(let i in this.buttons) {
                if (this.buttons[i].scene === scene) this.buttons[i].run(mx, my, click);
            }
        },
        
        add (config) {
            this.buttons.push (new Button(config));
        }
    }
})();