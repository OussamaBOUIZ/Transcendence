import { SketchProps, P5CanvasInstance } from "react-p5-wrapper";

interface MySketchProps extends SketchProps {
    rotation: number;
}

interface Velocity {
    x: number;
    y: number
}

const PH: number = 300;
const PW: number = 10;
const GAP: number = 10;
const PSPEED: number = 10;
const RADIUS: number = 10;

const vel: Velocity = {
    x: 5,
    y: 5,
};

function collision(pad: Pad, ball: Ball): boolean {
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

class Ball {
    x: number;
    y: number;
    r: number;


    constructor(x: number, y:number, r:number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    
    drawBall(p5: any) {
        p5.ellipse(this.x, this.y, this.r * 2);
    }
    
    updateBall(p5: any) {
        this.drawBall(p5);
        this.x += vel.x;
        this.y += vel.y;
        
        if (this.y < 0 || this.y > p5.height)
            vel.y *= -1;

        if (this.x < 0 || this.x > p5.width) {
            this.x = p5.width / 2;
            this.y = p5.height / 2;
        }
    }
}

class Pad {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y:number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    drawPad(p5: any) {
        p5.rect(this.x, this.y, this.w, this.h);
    }
    
    updatePad(p5: any, ball: Ball) {
        this.drawPad(p5);
        
        if (p5.keyIsDown(p5.UP_ARROW) && this.y > GAP) {
            this.y -= PSPEED;
        }
        
        if (p5.keyIsDown(p5.DOWN_ARROW) && this.y + this.h < p5.height - GAP) {
            this.y += PSPEED;
        }

        if (collision(this, ball))
            vel.x *= -1;
    }
}

let leftPad: Pad;
let rightPad: Pad;
let ball: Ball;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let state = {
        rotation: 0,
    }

    p5.updateWithProps = (props: any) => {
        state = Object.assign(state, props)
    };

    p5.setup = (): void => {
        p5.createCanvas(800, 500);
        leftPad = new Pad(GAP, (p5.height / 2) - PH / 2, PW, PH);
        rightPad = new Pad(p5.width - PW - GAP, (p5.height / 2) - PH / 2, PW, PH);
        ball = new Ball(p5.width / 2, p5.height/2, RADIUS);
    }

    console.log(state.rotation);

    p5.draw = (props: any): void => {
        p5.background(150)
        leftPad.updatePad(p5, ball);
        rightPad.updatePad(p5, ball);
        ball.updateBall(p5);
    }
}

export default sketch;