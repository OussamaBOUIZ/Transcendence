import { P5CanvasInstance } from "react-p5-wrapper";
import { MySketchProps} from "./Interfaces";
import { makeNoise } from "./utils"
import vars from "./vars"
import Ball from "./Ball"
import Pad from "./Pad";

const prevPos: Array<Ball> = [];

let leftPad: Pad;
let rightPad: Pad;
let ball: Ball;

export function reset(p5: any, isHost: boolean): void {
    const angle: number = p5.random(p5.PI / 4, -p5.PI / 4);
    vars.vel.x = vars.SPEED * p5.cos(angle);
    vars.vel.y = vars.SPEED * p5.sin(angle);

    vars.vel.x *= p5.random(1) < 0.5 ? -1 : 1;        

    leftPad = new Pad(vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
    rightPad = new Pad(p5.width - vars.PW - vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
    if (isHost)
        ball = new Ball(p5.width / 2, p5.height / 2, vars.RADIUS, {r: 255, g: 13, b: 140, a: 255});
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