import { SketchProps } from "react-p5-wrapper";

export interface MySketchProps extends SketchProps {
    rotation: number;
    theme: string;
    socket: any;
    isHost: boolean;
    setIsHost: any;
    gameKey: string;
    isMatching: boolean;
    gameMode: GameMode | null;
    score: Score;
    setScore: any; 
}

export interface Velocity {
    x: number;
    y: number;
}

export interface Pos {
    x: number;
    y: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Vars {
    PH: number;
    PW: number;
    GAP: number;
    PSPEED: number;
    RADIUS: number;
    SPEED: number;
    vel: Velocity;
}

export interface GameMode {
    modeName: string;
    ball: String | null;
    paddle: string | null;
    background: String | null;
    color: Color | null;
    xp: number;
    maxScore: number;
};

export interface Score {
    myScore: number;
    oppScore: number;
}