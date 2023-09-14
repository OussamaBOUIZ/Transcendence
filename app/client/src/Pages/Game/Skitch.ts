import { P5CanvasInstance } from "react-p5-wrapper";
import { MySketchProps, Score} from "./Interfaces";
import { makeNoise, clipCanvas, resizeGameVars } from "./utils"
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

export function adjustGame(p5: P5CanvasInstance<MySketchProps>) {
    resizeGameVars(p5.width);
    ball?.updateAttr(vars.RADIUS);
    leftPad?.updateAttr(vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
    rightPad?.updateAttr(p5.width - vars.PW - vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
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
        gameMode: null,
        score: {myScore: 0, oppScore: 0},
        setScore: () => {},
        isGameEnd: false,
        setIsGameEnd: () => {}
    }

    let first_time: boolean = true;

    let backImg: string;
    let ballImg: string;
    let paddleImg: string;
    let endGameImg: string;
    let readyImg : string;

    p5.preload = (): void => {
        backImg = p5.loadImage("/src/Assets/GameArea/galaxy.jpg");
    }

    p5.windowResized = (): void => {
        let canvasWidth = clipCanvas(p5.windowWidth / 1.5);
        p5.resizeCanvas(canvasWidth, canvasWidth / 1.77);
        adjustGame(p5);
    }

    p5.updateWithProps = (p: any) => {
        props = Object.assign(props, p)
    };

    p5.setup = (): void => {
        let canvasWidth = clipCanvas(p5.windowWidth / 1.5);
        p5.createCanvas(canvasWidth, canvasWidth / 1.77);
        adjustGame(p5);
        reset(p5, props.isHost);

        if (props.gameMode) {
            backImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.background}`);
            ballImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.ball}`);
            paddleImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.paddle}`);
            endGameImg = p5.loadImage(`/src/Assets/GameArea/BigGame.jpg`);
            readyImg =  p5.loadImage(`/src/Assets/GameArea/Ready.jpg`);
        }
    }

    p5.draw = (): void => {
        if (props.isGameEnd) {
            // setTimeout()
            p5.image(endGameImg, 0, 0, p5.width, p5.height);
        } else {
            if (props.theme === "black")
                p5.background("#114");

            props.socket?.on("notHost", () => {
                props.setIsHost(false);
                console.log(props.isHost);
            })


            if (backImg)
                p5.image(backImg, 0, 0, p5.width, p5.height);

            p5.background(0, 0, 0, 150);
            

            if (!props.isMatching && props.gameMode) {
                if (first_time) {
                    setTimeout(() => {
                        first_time = false;
                    }, 2000)
                    p5.image(readyImg, 0, 0, p5.width, p5.height);
                } else {
     
                    if (props.isHost) {
                        props.socket?.emit("game", {
                            gameKey: props.gameKey,
                            padX: rightPad.y,
                            ballX: ball?.x,
                            ballY: ball?.y,
                            canvasSize: p5.width,
                        });
                    }
                    else {
                        props.socket?.emit("game", {
                            gameKey: props.gameKey, 
                            padX: leftPad.y,
                            canvasSize: p5.width,
                        });
                    }

                    props.socket?.on("movePad", (data: any) => {
                        let per = p5.width / data.canvasSize;

                        if (props.isHost)    
                            leftPad.y = data.padX * per;
                        else
                            rightPad.y = data.padX * per;

                        if (!props.isHost) {
                            ball.x = data.ballX * per;
                            ball.y = data.ballY * per;
                        }
                    })

                    prevPos.forEach( (b: Ball, idx: number) =>  {
                        b.fadeEffect();
                        b.drawBall(p5, null);

                        if (b.r <= 0) {
                            prevPos.splice(idx, 1);
                        }
                    })
                    
                    prevPos.push(ball.clone(props.gameMode.color));
            
                    if (props.isHost) {
                        leftPad.updatePad(p5, ball, false, props.isHost, paddleImg);
                        rightPad.updatePad(p5, ball, true, props.isHost, paddleImg);
                    } else {
                        leftPad.updatePad(p5, ball, true, props.isHost, paddleImg);
                        rightPad.updatePad(p5, ball, false, props.isHost, paddleImg);
                    }

                    ball.updateBall(p5, ballImg, props);
                }
            } else
                makeNoise(p5);
            
        }
    }
}

export default sketch;