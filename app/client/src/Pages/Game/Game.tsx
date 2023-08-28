import React, {useState, useContext} from 'react'
import { io } from "socket.io-client";

import { ReactP5Wrapper } from "react-p5-wrapper"

import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import UserContext from '../../Context/UserContext';


export default function Game () {
    const [rotation, setRotation] = useState(6);
    const [socket, setSocket] = useState<any | null>();
    const { user } = useContext(UserContext);

    useEffectOnUpdate( () => {
        setSocket(io("ws://localhost:4343"));
    }, [])


    return (
        <ReactP5Wrapper sketch={sketch} socket={socket} theme="black"/>
    );
}