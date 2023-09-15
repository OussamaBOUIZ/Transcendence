import { P5CanvasInstance } from "react-p5-wrapper";
import { MySketchProps } from "./Interfaces";
import vars from "./vars";
import Ball from "./Ball";
import Pad from "./Pad";

export function collision(pad: Pad, ball: Ball): boolean {
    const distX: number = Math.abs(ball.x - pad.x - pad.w / 2);
    const distY: number = Math.abs(ball.y - pad.y - pad.h / 2);
  
    if (distX > pad.w / 2 + ball.r)
      return false;
  
    if (distY > pad.h / 2 + ball.r)
      return false;
  
  
    if (distX <= pad.w / 2)
      return true;
  
    if (distY <= pad.h / 2)
      return true;
  
    
    const dx: number = distX - pad.w / 2;
    const dy: number = distY - pad.h / 2;
    return dx * dx + dy * dy <= ball.r * ball.r;
}

function matchingText(p5: P5CanvasInstance<MySketchProps>) {
  p5.push()
  p5.fill(255);
  p5.textSize(50);
  p5.textAlign(p5.CENTER);
  p5.textStyle(p5.BOLDITALIC)
  p5.text("Matching...", p5.width / 2, p5.height / 2);
  p5.pop();
}

var time: number = 0;
export function makeNoise(p5: P5CanvasInstance<MySketchProps>) {
    let img = p5.createImage(p5.width, p5.height);
    img.loadPixels();
  
    for (let i = 0, n = img.pixels.length; i < n; i += 4) {
      let c = 7 + p5.sin(i / 50000 + time / 7);
      img.pixels[i] = img.pixels[i + 1] = img.pixels[i + 2] = 40 * p5.random() * c;
      img.pixels[i + 3] = 130;
    }
  
    img.updatePixels();
    p5.image(img, 0, 0);

    matchingText(p5)
  
    time = (time + 1) % p5.height;
}

export function clipCanvas(width: number) {
  if (width < 300 )
      return 300;
  else if (width > 900)
      return 800;
  return width
}

export function resizeGameVars(width: number) {
  vars.PH = width / 12;
  vars.PW = width / 80;
  vars.GAP = width / 80;
  vars.PSPEED = width / 80;
  vars.RADIUS = width / 80;
  vars.SPEED = width / 85;
  vars.NW = width / 200;
  vars.NH = width / 60;
}