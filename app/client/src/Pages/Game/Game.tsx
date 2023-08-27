import React, {useState} from 'react'
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketch from "./Skitch"

// const gameStyles = {
//     display: "grid",
//     placeItems: "center"
// }


export default function Game () {
    const [rotation, setRotation] = useState(6);

    return (
        <ReactP5Wrapper sketch={sketch} rotation={rotation}/>
    );
}