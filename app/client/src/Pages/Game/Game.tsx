import React, {useState} from 'react'

import {io} from "socket.io-client";
import { useParams } from "react-router-dom"

import { GameMode } from './Interfaces';
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';




let gameModes = new Map<String, GameMode>([
    ["BattleRoyal", {
        ball: "fireBall.png",
        color: {r: 135, g: 206, b: 235, a: 1},
        background: "fire-game.jpg",
        xp: 6000
    }],

    ["TheBeat", {
        ball: "fireBall.png",
        color: {r: 135, g: 206, b: 235, a: 1},
        background: "fire-game.jpg",
        xp: 5000,
    }],
    ["IceLand", {
        ball: "iceLand.png",
        color: {r: 135, g: 206, b: 235, a: 1},
        background: "fire-game.jpg",
        xp: 4000,
    }],
    ["BrighGround", {
        ball: "fireBall.png",
        color: {r: 135, g: 206, b: 235, a: 1},
        background: "fire-game.jpg",
        xp: 3000,
    }],
]);


export default function Game () {
    const [isHost, setIsHost] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const [gameKey, setGameKey] = useState<string | null>(null);
    const [isMatching, setIsMatching] = useState<boolean>(false);
    
    // const { user } = useContext(UserContext);
    const {key, gameMode} = useParams();

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
            gameMode={gameMode && gameModes.get(gameMode)}
            isMatching={isMatching}
        />
    );
}
