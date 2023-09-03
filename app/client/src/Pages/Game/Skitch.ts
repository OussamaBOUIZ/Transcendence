import {  P5CanvasInstance } from "react-p5-wrapper";
import { MySketchProps, Velocity, Pos, Color } from "./Interfaces";

const PH: number = 80;
const PW: number = 10;
const GAP: number = 10;
const PSPEED: number = 10;
const RADIUS: number = 8;
const SPEED: number = 6;

const vel: Velocity = {
    x: 0,
    y: 0,
};

const prevPos: Array<Ball> = [];

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
    color: Color;

    constructor(x: number, y: number, r: number, color: Color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    
    fadeEffect () {
        this.color.a -= 10;
        this.r -= 0.5;
    }
    
    drawBall(p5: any) {
        p5.fill(this.color.r, this.color.g, this.color.b, this.color.a);
        p5.noStroke();
        p5.ellipse(this.x, this.y, this.r * 2);
    }
    
    updateBall(p5: any, isHost: boolean) {
        this.drawBall(p5);

        if (isHost) {
            this.x += vel.x;
            this.y += vel.y;
            
            if (this.y < (this.r * 2) || this.y > p5.height - (this.r * 2))
                vel.y *= -1;

            if (this.x < 0 || this.x > p5.width) {
                if (isHost)
                    reset(p5, isHost);
            }
        }
    }

    clone(): Ball {
        const b: Ball = new Ball(this.x, this.y, this.r, structuredClone(this.color));
        b.color.r -= 100;
        b.color.a -= 100;
        return b;
    }
}

class Pad {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    drawPad(p5: any) {
        p5.fill(255)
        p5.rect(this.x, this.y, this.w, this.h);
    }
    
    updatePad(p5: any, ball: Ball, myPad: boolean, isHost: boolean) {
        this.drawPad(p5);
        
        if (myPad) {
            if (p5.keyIsDown(p5.UP_ARROW) && this.y > GAP)
                this.y -= PSPEED;
            
            if (p5.keyIsDown(p5.DOWN_ARROW) && this.y + this.h < p5.height - GAP)
                this.y += PSPEED;
        }

        if (isHost && collision(this, ball)) {
            const rad: number = p5.radians(45);
            const diff: number = ball.y - this.y;
            const angle: number = p5.map(diff, 0, this.h, -rad, rad);
            vel.y = SPEED * p5.sin(angle);

            if(this.x < p5.width / 2)
                vel.x = SPEED * p5.cos(angle);
            else
                vel.x = (SPEED * p5.cos(angle)) * -1;
        }
    }
}

let leftPad: Pad;
let rightPad: Pad;
let ball: Ball;

function reset(p5: any, isHost: boolean): void {
    const angle: number = p5.random(p5.PI / 4, -p5.PI / 4);
    vel.x = SPEED * p5.cos(angle);
    vel.y = SPEED * p5.sin(angle);

    vel.x *= p5.random(1) < 0.5 ? -1 : 1;        

    leftPad = new Pad(GAP, (p5.height / 2) - PH / 2, PW, PH);
    rightPad = new Pad(p5.width - PW - GAP, (p5.height / 2) - PH / 2, PW, PH);
    if (isHost)
        ball = new Ball(p5.width / 2, p5.height / 2, RADIUS, {r: 255, g: 13, b: 140, a: 255});
}

var time: number = 0;

function makeNoise(p5: P5CanvasInstance<MySketchProps>) {
    let img = p5.createImage(p5.width, p5.height);
    img.loadPixels();
  
    for (let i = 0, n = img.pixels.length; i < n; i += 4) {
      let c = 7 + p5.sin(i / 50000 + time / 7);
      img.pixels[i] = img.pixels[i + 1] = img.pixels[i + 2] = 40 * p5.random() * c;
      img.pixels[i + 3] = 130;
    }
  
    img.updatePixels();
    p5.image(img, 0, 0);
  
    time = (time + 1) % p5.height;
}

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let props: MySketchProps = {
        rotation: 0,
        theme: "",
        socket: null,
        isHost: true,
        setIsHost: () => {},
        gameKey: "",
        isMatching: true,
    }

    p5.updateWithProps = (p: any) => {
        props = Object.assign(props, p)
    };

    p5.setup = (): void => {
        p5.createCanvas(500, 300);
        reset(p5, props.isHost);
        // p5.frameRate(30)
    }


    p5.draw = (): void => {
        if (props.theme === "black")
            p5.background(0);
        else if (props.theme == "white")
            p5.background(255);
        else if (props.theme === "grey")
            p5.background(200);

        props.socket?.on("notHost", () => {
            props.setIsHost(false);
            console.log(props.isHost);
        })

        if (!props.isMatching) {
            if (props.isHost)
                props.socket?.emit("game", {gameKey: props.gameKey, padX: rightPad.y, ballX: ball?.x, ballY: ball?.y});
            else 
                props.socket?.emit("game", {gameKey: props.gameKey, padX: leftPad.y});
                prevPos.push(ball.clone());
                prevPos.forEach( (b: Ball, idx: number) =>  {
                    b.fadeEffect();
                    b.drawBall(p5);
    
                    // console.log("test")
    
                    if (b.r <= 2) {
                        prevPos.splice(idx, 1);
                    }255
                })
            props.socket?.on("movePad", (data: any) => {

                if (props.isHost)    
                    leftPad.y = data.padX;
                else
                    rightPad.y = data.padX;

                if (!props.isHost) {
                    ball.x = data.ballX;
                    ball.y = data.ballY;
                }

            })

            prevPos.forEach( (b: Ball, idx: number) =>  {
                b.fadeEffect();
                b.drawBall(p5);

                // console.log("test")

                if (b.r <= 0) {
                    prevPos.splice(idx, 1);
                }
            })
            prevPos.push(ball.clone());
    
            if (props.isHost) {
                leftPad.updatePad(p5, ball, false, props.isHost);
                rightPad.updatePad(p5, ball, true, props.isHost);
            } else {
                leftPad.updatePad(p5, ball, true, props.isHost);
                rightPad.updatePad(p5, ball, false, props.isHost);
            }
            ball?.updateBall(p5, props.isHost);


        } else 
            makeNoise(p5);
    }
}

export default sketch;