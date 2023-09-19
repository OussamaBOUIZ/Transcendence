import { Color, MySketchProps, Score } from "./Interfaces"
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
        this.color.a -= 20;
        this.r -= 1;
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

    updateScore(props: MySketchProps, newScore: Score) {
        props.socket?.emit("gameScore", {roomKey: props.gameKey, score: { 
            myScore: newScore.oppScore,
            oppScore: newScore.myScore
        }});
    }
    
    updateBall(p5: any, ballImg: string, props: MySketchProps) {

        if (vars.effect !== 32 || props.gameMode?.ability !== "hide")
            this.drawBall(p5, ballImg);

        if (this.x < 0 || this.x > p5.width) {        
            if (props.isHost) {
                reset(p5, props.isHost);

                if (this.x < 0) {
                    props.setScore((prevState: Score) => {
                        const newScore: Score = {...prevState, myScore: prevState.myScore++}
                        this.updateScore(props, newScore);
                        return newScore;
                    });
                }

                if (this.x > p5.width) {
                    props.setScore((prevState: Score) => {
                        const newScore: Score = {...prevState, oppScore: prevState.oppScore++}
                        this.updateScore(props, newScore);
                        return newScore;
                    });
                }

            }
        }

        if (props.isHost) {
            this.x += vars.vel.x;
            this.y += vars.vel.y;
            if (this.y < (this.r * 2) || this.y > p5.height - (this.r * 2))
                vars.vel.y *= -1;
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