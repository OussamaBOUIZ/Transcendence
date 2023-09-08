import {Color} from "./Interfaces"
import vars from "./vars"
import { reset } from "./Skitch"

export default class Ball {
    x: number;
    y: number;
    r: number;
    color: Color;
    angle: number;

    constructor(x: number, y: number, r: number, color: Color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.angle = 0;
    }
    
    fadeEffect () {
        this.color.a -= 12;
        this.r -= 0.5;
    }
    
    drawBall(p5: any, ballImg: string | null) {
        p5.push();
        if (ballImg) {
            // p5.translate(this.x - this.r, this.y - this.r);
            
            // p5.rotate(p5.radians(this.angle));

            p5.imageMode(p5.CENTER);
            p5.image(ballImg, this.x , this.y , this.r * 2, this.r * 2);

            this.angle += 0.01;
        } else {
            p5.fill(this.color.r, this.color.g, this.color.b, this.color.a);
            p5.noStroke();
            p5.ellipse(this.x, this.y, this.r * 2);
        }
        p5.pop();
    }

    updateAttr(r: number) {
        this.r = r;
    }
    
    updateBall(p5: any, isHost: boolean, ballImg: string) {
        this.drawBall(p5, ballImg);

        if (isHost) {
            this.x += vars.vel.x;
            this.y += vars.vel.y;
            
            if (this.y < (this.r * 2) || this.y > p5.height - (this.r * 2))
                vars.vel.y *= -1;

            if (this.x < 0 || this.x > p5.width) {
                if (isHost)
                    reset(p5, isHost);
            }
        }
    }

    clone(): Ball {
        const b: Ball = new Ball(this.x, this.y, this.r, structuredClone(this.color));
        b.color.r = 135;
        b.color.g = 206;
        b.color.b = 235;
        b.color.a = 255;
        return b;
    }
}