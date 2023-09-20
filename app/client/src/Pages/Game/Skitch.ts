import { P5CanvasInstance } from "react-p5-wrapper";
import { MySketchProps} from "./Interfaces";
import { makeNoise, clipCanvas, resizeGameVars, ActivateEffect } from "./utils"
import vars from "./vars"
import Ball from "./Ball"
import Pad from "./Pad";
import Net from "./Net";

const prevPos: Array<Ball> = [];

let leftPad: Pad;
let rightPad: Pad;
let ball: Ball;
let net: Net;

export function reset(p5: any, isHost: boolean): void {
    const angle: number = p5.random(p5.PI / 4, -p5.PI / 4);
    vars.vel.x = vars.ISPEED * p5.cos(angle);
    vars.vel.y = vars.ISPEED * p5.sin(angle);
    vars.effect = "";
    vars.isEffect = false;

    vars.vel.x *= p5.random(1) < 0.5 ? -1 : 1;

    leftPad = new Pad(vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
    rightPad = new Pad(p5.width - vars.PW - vars.GAP, (p5.height / 2) - vars.PH / 2, vars.PW, vars.PH);
    if (isHost)
        ball = new Ball(p5.width / 2, p5.height / 2, vars.RADIUS, {r: 255, g: 13, b: 140, a: 255});

    net = new Net(vars.NW, vars.NH, vars.GAP);
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
        setIsGameEnd: () => {},
        isWin: false,
        isEffect: null,
        setPersentage: () => {},
        firstTime: true,
        setFirstTime: () => {},
        isClicked: true,
        setIsClicked: () => {},
    }

    let gameEnd: boolean = false; 
    let backImg: string;
    let ballImg: string;
    let paddleImg: string;
    let loseImg: string;
    let winImg: string;
    let readyImg : string;


    p5.preload = (): void => {
        backImg = p5.loadImage("/src/Assets/GameArea/BattleRoyal.jpg");
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
        p5.frameRate(602)
        adjustGame(p5);
        reset(p5, props.isHost);

        if (props.gameMode) {
            backImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.background}`);
            ballImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.ball}`);
            paddleImg = p5.loadImage(`/src/Assets/GameArea/${props.gameMode.paddle}`);
            loseImg = p5.loadImage(`/src/Assets/GameArea/Lose.png`);
            winImg = p5.loadImage(`/src/Assets/GameArea/Win.png`);
            readyImg =  p5.loadImage(`/src/Assets/GameArea/Ready.jpg`);
        }
    }  

    p5.draw = (): void => {
        if (gameEnd)
            return;

        if (props.isGameEnd) {

            console.log(props.isWin);

            if (props.isWin)
                p5.image(winImg, 0, 0, p5.width, p5.height);
            else
                p5.image(loseImg, 0, 0, p5.width, p5.height);

            gameEnd = true;
            
        } else {
            if (props.theme === "black")
                p5.background("#114");

            props.socket?.on("notHost", () => {
                props.setIsHost(false);
            })

            if (backImg)
                p5.image(backImg, 0, 0, p5.width, p5.height);

            p5.background(0, 0, 0, 70);
            net.drawAllNets(p5);
            

            if (!props.isMatching && props.gameMode) {
                if (props.firstTime) {

                    setTimeout(() => {
                        props.setFirstTime(false);
                    }, 2000)

                    p5.image(readyImg, 0, 0, p5.width, p5.height);
                } else {
                    if (props.isEffect?.current && !vars.isEffect) {
                        // console.log("heeeeeeeeeeeeeeeere");
                        ActivateEffect(p5, props);
                    }
                    
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

                    if (vars.isEffect) {
                        props.socket?.emit("sendEffect", {roomKey: props.gameKey, effect: props.gameMode.ability });
                    }
                    props.socket?.on("recieveEffect", (effect: string) => {
                        vars.effect = effect;
                        setTimeout(() => {
                            vars.effect = "";
                        }, 800)
                    })

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
                        if (vars.effect !== "hide")
                            b.drawBall(p5, null);

                        if (b.r <= 0) {
                            prevPos.splice(idx, 1);
                        }
                    })

                    if (vars.effect === "reverse") {
                        if (vars.isEffect && props.isHost) {
                            vars.vel.y -= 0.3;
                            vars.vel.x -= 0.4;
                        } else {
                            vars.vel.y += 0.3;
                            vars.vel.x += 0.4;
                        }
                        // vars.effect = "";
                        // console.log(vars.effect);
                    }


                    if (vars.effect === "speed") {
                        vars.vel.y *= 1.02;
                        vars.vel.x *= 1.02;
                    }
                    
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