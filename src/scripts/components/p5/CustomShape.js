/* eslint-disable no-plusplus */
// to create a custom shape we need begin and endShape

export class CustomShape {
  constructor(p, vertices) {
    p.beginShape();
    p.stroke(255);
    p.noFill();
    for (let i = 0; i < vertices.length; i++) {
      p.vertex(vertices[i].x, vertices[i].y);
    }
    p.endShape();
  }
}
