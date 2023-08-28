import { SketchProps, P5CanvasInstance } from "react-p5-wrapper";

interface MySketchProps extends SketchProps {
    rotation: number;
    theme: string;
}

interface Velocity {
    x: number;
    y: number;
}

const PH: number = 80;
const PW: number = 10;
const GAP: number = 10;
const PSPEED: number = 10;
const RADIUS: number = 10;
const SPEED: number = 6;

const vel: Velocity = {
    x: 0,
    y: 0,
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
        
        if (this.y < (this.r * 2) || this.y > p5.height - (this.r * 2))
            vel.y *= -1;

        if (this.x < 0 || this.x > p5.width) {
            reset(p5);
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
        
        if (p5.keyIsDown(p5.UP_ARROW) && this.y > GAP)
            this.y -= PSPEED;
        
        if (p5.keyIsDown(p5.DOWN_ARROW) && this.y + this.h < p5.height - GAP)
            this.y += PSPEED;

        if (collision(this, ball)) {
            const diff: number = (ball.y - (this.y - this.h / 2)) / (this.h / 2);
            const angle: number = (p5.PI / 10) * diff;

            let dir: number = ball.x > p5.width / 2 ? -1 : 1;

            vel.x = SPEED * dir * p5.cos(angle);
            vel.y = SPEED * dir * p5.sin(angle);
        }
    }
}

let leftPad: Pad;
let rightPad: Pad;
let ball: Ball;

function reset(p5: any): void {
    const angle: number = p5.random(p5.PI / 4, -p5.PI / 4);
    vel.x = SPEED * p5.cos(angle);
    vel.y = SPEED * p5.sin(angle);

    vel.x *= p5.random(1) < 0.5 ? -1 : 1;        

    leftPad = new Pad(GAP, (p5.height / 2) - PH / 2, PW, PH);
    rightPad = new Pad(p5.width - PW - GAP, (p5.height / 2) - PH / 2, PW, PH);
    ball = new Ball(p5.width / 2, p5.height / 2, RADIUS);
}

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let props: MySketchProps = {
        rotation: 0,
        theme: "",
    }

    p5.updateWithProps = (p: any) => {
        props = Object.assign(props, p)
    };

    p5.setup = (): void => {
        p5.createCanvas(600, 400);
        reset(p5);
    }


    p5.draw = (): void => {
        if (props.theme === "black")
            p5.background(0);
        else if (props.theme == "white")
            p5.background(255);
        else if (props.theme === "grey")
            p5.background(200);

        leftPad.updatePad(p5, ball);
        rightPad.updatePad(p5, ball);
        ball.updateBall(p5);
    }
}

export default sketch;