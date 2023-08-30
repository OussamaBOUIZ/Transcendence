import React, {useState, useEffect} from 'react'
import {io, Socket} from "socket.io-client";

import { ReactP5Wrapper } from "react-p5-wrapper"

import sketch from "./Skitch"
import useEffectOnUpdate from '../../Hooks/useEffectOnUpdate';
import UserContext from '../../Context/UserContext';


export default function Game () {
    const [isHost, setIsHost] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    // const { user } = useContext(UserContext);

    useEffectOnUpdate( () => {
        const newSocket: any = io("ws://localhost:4343");
        setSocket(newSocket);

        return () => {
            console.log("component unmount");
            newSocket.disconnect();
        };
    }, [])

    console.log(socket);
    


    return (
        <ReactP5Wrapper 
            sketch={sketch}
            socket={socket}
            theme="black"
            isHost={isHost}
            setIsHost={setIsHost}
        />
    );
}