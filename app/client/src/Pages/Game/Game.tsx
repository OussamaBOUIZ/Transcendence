import React, {useState, useEffect} from 'react'
import {io, Socket} from "socket.io-client";
import { useParams } from "react-router-dom"

import { ReactP5Wrapper } from "react-p5-wrapper"

import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import UserContext from '../../Context/UserContext';


export default function Game () {
    const [isHost, setIsHost] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const [gameKey, setGameKey] = useState<string | null>(null);
    
    // const { user } = useContext(UserContext);
    const {key}: {key: string} = useParams();

    useEffectOnUpdate( () => {
        if (key) {
            const newSocket: any = io("ws://localhost:4343");
            setSocket(newSocket);

            setGameKey(key);
            newSocket.emit("joinGame", key);

            return () => {
                console.log("component unmount");
                newSocket.emit("gameEnd", key)
                newSocket.disconnect();
            };
        }
    }, [])

    console.log(key);


    return (
        <ReactP5Wrapper 
            sketch={sketch}
            socket={socket}
            theme="black"
            isHost={isHost}
            setIsHost={setIsHost}
            gameKey={gameKey}
        />
    );
}