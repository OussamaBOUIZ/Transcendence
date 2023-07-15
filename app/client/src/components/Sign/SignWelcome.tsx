import React from "react"

export default function Welcome({ SignX }) {
    return (
        <div className="welcome">
        {
            SignX === "in" ?
            <p className="hd" style={{fontSize: "clamp(2rem, 6vw, 6.2rem)"}}>Hi there!</p> :
            <p className="hd" style={{fontSize: "5.5rem"}}>Get Started</p>
        }
        {
            SignX === "in" ?
            <p className='pr'>Welcome to PongLogo, Game Application</p> :
            <p className='pr'>Let’s get Ready for Next-Level Ping Pong</p>            
        }
        </div>
    )
}