import vars from "./vars"
import Ball from "./Ball";
import { collision } from "./utils";

export default class Pad {
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
            if (p5.keyIsDown(p5.UP_ARROW) && this.y > vars.GAP)
                this.y -= vars.PSPEED;
            
            if (p5.keyIsDown(p5.DOWN_ARROW) && this.y + this.h < p5.height - vars.GAP)
                this.y += vars.PSPEED;
        }

        if (isHost && collision(this, ball)) {
            const rad: number = p5.radians(45);
            const diff: number = ball.y - this.y;
            const angle: number = p5.map(diff, 0, this.h, -rad, rad);
            vars.vel.y = vars.SPEED * p5.sin(angle);

            if(this.x < p5.width / 2)
                vars.vel.x = vars.SPEED * p5.cos(angle);
            else
                vars.vel.x = (vars.SPEED * p5.cos(angle)) * -1;
        }
    }
}
