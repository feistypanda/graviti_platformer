
const images = {
    title (){
        let g = processing.createGraphics(600, 600, processing.constants.P2D);

        function drawIt (mask) {

            if (mask) {g.background(0);}

            g.noFill();
            g.stroke(mask? 255:190);
            g.strokeWeight(20);

            g.strokeJoin(processing.constants.MITER);
            g.strokeCap(processing.constants.PROJECT);

            g.beginShape();
            g.vertex (106, 40);
            g.vertex (25, 40);
            g.vertex (25, 140);
            g.vertex (106, 140);
            g.vertex (106, 96);
            g.vertex (70, 96);
            g.endShape();

            g.beginShape();
            g.vertex (148, 140);
            g.vertex (148, 40);
            g.vertex (218, 40);
            g.vertex (218, 88);
            g.vertex (163, 88);
            g.vertex (202, 88);
            g.vertex (217, 160);
            g.endShape();

            g.beginShape();
            g.vertex (240, 180);
            g.vertex (285, 40);
            g.vertex (290, 40);
            g.vertex (335, 180);
            g.endShape();

            g.beginShape();
            g.vertex (244 + 80, 0);
            g.vertex (290 + 80, 140);
            g.vertex (295 + 80, 140);
            g.vertex (340 + 80, 0);
            g.endShape();

            g.beginShape();
            g.vertex (444, 69);
            g.vertex (444, 140);
            g.endShape();

            g.stroke (mask? 255:g.color(200, 100, 100));

            g.beginShape();
            g.vertex (444, 40);
            g.vertex (444, 45);
            g.endShape();

            g.stroke(mask?255:190);

            g.beginShape();
            g.vertex (476, 40);
            g.vertex (549, 40);
            g.vertex (511, 40);
            g.vertex (511, 141);
            g.endShape();

            g.beginShape();
            g.vertex (571, 69);
            g.vertex (571, 140);
            g.endShape();

            g.stroke (mask?255:g.color(200, 100, 100));

            g.beginShape();
            g.vertex (571, 40);
            g.vertex (571, 45);
            g.endShape();

            if (mask) {
                g.fill(0);
                g.noStroke();
                g.rect(0, 0, 600, 30);
                g.rect(0, 150, 600, 600);
            }

            return g.get();
        }
    
        let img = drawIt(false);
        img.mask(drawIt(true));

        return img;
    },
};
