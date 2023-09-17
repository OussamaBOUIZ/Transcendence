import React, { SetStateAction } from "react";
import { SketchProps } from "react-p5-wrapper";
import { Socket } from "socket.io-client";

export interface MySketchProps extends SketchProps {
    rotation: number;
    theme: string;
    socket: Socket | null;
    isHost: boolean;
    setIsHost:  React.Dispatch<React.SetStateAction<boolean>>;
    gameKey: string;
    isMatching: boolean;
    gameMode: GameMode | null;
    score: Score;
    setScore:  React.Dispatch<React.SetStateAction<Score>>;
    isGameEnd: boolean;
    setIsGameEnd: React.Dispatch<SetStateAction<boolean>>;
    isWin: boolean;
    isEffect: React.MutableRefObject<boolean> | null;
    setPersentage: React.Dispatch<React.SetStateAction<Persentage>>;
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
    NW: number;
    NH: number;
    vel: Velocity;
    isEffect: boolean;
    effect: number;
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

export interface Persentage {
    myPersentage: number;
    oppPersentage: number;
}