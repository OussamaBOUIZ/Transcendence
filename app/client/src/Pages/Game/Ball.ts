import {Color} from "./Interfaces"
import vars from "./vars"
import { reset } from "./Skitch"

export default class Ball {
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
        this.color.a -= 12;
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
        b.color.r = 255;
        b.color.g = 140;
        b.color.b = 0;
        b.color.a = 255;
        return b;
    }
}