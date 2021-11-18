/* eslint-disable no-plusplus */
import { CustomShape } from './p5/CustomShape';

export const sketch = (p) => {
  /**
   * Variables
   */

  const drawing = [];
  let currentPath;
  /**
   * preload assets like images, sounds etc.
   * runs async
   * setup() will wait for loaded assets in preload
   */
  p.preload = () => {};

  /**
   * runs only once at the beginning
   */
  p.setup = () => {
    /**
     * needed to display things in a 2D space
     */
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.mousePressed(p.startPath);
    canvas.mouseReleased(p.endPath);

    p.background(0);

    p.rectMode(p.CENTER);
    // p.ellipseMode(s.CENTER);

    /**
     * change frame rate for draw() which runs x (default 60) times every sec
     */
    // frameRate(2)
  };

  p.startPath = () => {
    currentPath = [];
  };

  p.endPath = () => {
    drawing.push(currentPath);
  };

  /**
   * p5 draw = window.requestanimationframe
   */
  p.draw = () => {
    // p.background(0);

    if (p.mouseIsPressed) {
      const point = {
        x: p.mouseX,
        y: p.mouseY,
      };
      console.log(point);
      drawing.push(point);
      localStorage.setItem('drawing', JSON.stringify(drawing));
      console.log(drawing);
    }

    new CustomShape(p, drawing);

    /**
     * nur was zwischen push/pop ist wird ausgeführt
     * noStroke() wird zB nicht zum zweiten Rect übergeben
     */
    // p.push();
    // // p.stroke(r, g, b, a);
    // // p.strokeWeight();
    // p.noStroke();
    // p.fill(200);
    // /** rect(x, y, w, h) */
    // p.rect(p.width / 2, p.height / 2, 200, 200);
    // p.pop();

    // const mapX = p.map(p.mouseX, 0, p.windowWidth, 0, 500);

    // p.fill('white');
    // p.rect(p.mouseX, p.mouseY, mapX, 200);
  };
};

// ## Usage
// new p5(sketch);

// ## Variables
// mouseX
// mouseY
// width (Window Width)
// height
// mouseIsPressed
// keyIsPressed
// key (key === ‘a’)
// keyCode
// frameCount (number of frames since program runs)
// radians
//  -> konvertiert Grad → slow down → radians(frameCount)

// ## Functions
// random(minValue, maxValue)
// -> random(3) (beginnt bei 0)
// map(el, min, max, min, max)
// map(mouseX, 0, 600, 0, 255)
// -> weist mouseX eine neue Range von 0 - 255, statt 0 - 600 zu
// sin()
// tan()

// ## Events
// mousePressed()
// mouseReleased()
// keyPressed()
// keyReleased()
