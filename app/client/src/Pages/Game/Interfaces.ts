import { SketchProps } from "react-p5-wrapper";

export interface MySketchProps extends SketchProps {
    rotation: number;
    theme: string;
    socket: any;
    isHost: boolean;
    setIsHost: any;
    gameKey: string;
    isMatching: boolean;
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
