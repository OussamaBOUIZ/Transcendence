import React from "react";
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
    isGameEnd:  React.MutableRefObject<boolean>;
    isWin: React.MutableRefObject<boolean>;
    isEffect: React.MutableRefObject<boolean> | null;
    setPersentage: React.Dispatch<React.SetStateAction<Persentage>>;
    firstTime: boolean;
    setFirstTime: React.Dispatch<React.SetStateAction<boolean>>;
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
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
    ISPEED: number;
    NW: number;
    NH: number;
    vel: Velocity;
    isEffect: boolean;
    effect: string;
}

export interface GameMode {
    modeName: string;
    ball: String | null;
    paddle: string | null;
    background: String | null;
    color: Color | null;
    xp: number;
    maxScore: number;
    ability: string;
};

export interface Score {
    myScore: number;
    oppScore: number;
}

export interface Persentage {
    myPersentage: number;
    oppPersentage: number;
}