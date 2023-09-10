import { Color, Score } from "./Interfaces"
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
    
    drawBall(p5: any, ballImg: string | null) {
        p5.push();
        if (ballImg) {
            p5.imageMode(p5.CENTER);
            p5.image(ballImg, this.x , this.y , this.r * 2, this.r * 2);
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
    
    updateBall(p5: any, isHost: boolean, ballImg: string, setScore: any) {
        this.drawBall(p5, ballImg);

        if (isHost) {
            this.x += vars.vel.x;
            this.y += vars.vel.y;
            
            if (this.y < (this.r * 2) || this.y > p5.height - (this.r * 2))
                vars.vel.y *= -1;
        }

        if (this.x < 0 || this.x > p5.width) {
            if (isHost) {
                reset(p5, isHost);
            }

            if (this.x < 0)
                setScore((prevState: Score) => {return {...prevState, myScore: prevState.myScore++ }});

            if (this.x > p5.width)
                setScore((prevState: Score) => {return {...prevState, oppScore: prevState.oppScore++ }});
            
        }
    }

    clone(color: Color | null | undefined): Ball {
        const newBall: Ball = new Ball(this.x, this.y, this.r, structuredClone(this.color));

        if (color) {
            newBall.color.b = color.b;
            newBall.color.r = color.r;
            newBall.color.g = color.g;
        }

        return newBall;
    }
}