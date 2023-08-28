import React, {useState, useContext} from 'react'
import { Socket, io } from "socket.io-client";

import { ReactP5Wrapper } from "react-p5-wrapper"

import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import UserContext from '../../Context/UserContext';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: any) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}


export default function Game () {
    const [rotation, setRotation] = useState(6);
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null >();
    const { user } = useContext(UserContext)

    useEffectOnUpdate( () => {
        setSocket(io("ws://localhost:4343"));
        console.log(socket);
        socket.emit("game", "test");
    }, [])


    return (
        <ReactP5Wrapper sketch={sketch} socket={socket} theme="black"/>
    );
}