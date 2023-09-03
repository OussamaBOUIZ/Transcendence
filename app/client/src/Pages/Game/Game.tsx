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
    const [isMatching, setIsMatching] = useState<boolean>(false);
    
    // const { user } = useContext(UserContext);
    const {key}: {key: string} = useParams();

    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);

        if (key) {
            setGameKey(key);
            newSocket.emit("joinGame", key);
        } else {
            setIsMatching(true);
            newSocket.emit("gameMatching")

            newSocket.on("matched", (roomKey: string) => {
                console.log("matched room key: ", roomKey);
                setGameKey(roomKey);
                newSocket.emit("joinGame", roomKey);

                setIsMatching(false);
            })
        }

        return () => {
            console.log("component unmount");
            newSocket.emit("gameEnd", key)
            newSocket.disconnect();
        };
    }, [])


    return (
        <ReactP5Wrapper 
            sketch={sketch}
            socket={socket}
            theme="black"
            isHost={isHost}
            setIsHost={setIsHost}
            gameKey={gameKey}
            isMatching={isMatching}
        />
    );
}const RADIUS: number = 10;
const SPEED: number = 3;
