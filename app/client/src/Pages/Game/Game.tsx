import React, {useState} from 'react'
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketch from "./Skitch"


export default function Game () {
    const [rotation, setRotation] = useState(6);

    return (
        <ReactP5Wrapper sketch={sketch} theme="black"/>
    );
}