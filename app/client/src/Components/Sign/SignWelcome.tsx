import React from "react"

export default function Welcome({ SignX }) {
    return (
        <div className="welcome">
        {
            SignX === "in" ?
            <p className="hd" style={{fontSize: "clamp(4.5rem, 6vw, 7.2rem)"}}>Hi there!</p> :
            <p className="hd" style={{fontSize: "clamp(3.2rem, 4.5vw, 5.5rem)"}}>Get Started</p>
        }
        {
            SignX === "in" ?
            <p className='pr' style={{fontSize: "clamp(0.6rem, 0.9vw, 1.1rem)"}}>Welcome to PongLogo, Game Application</p> :
            <p className='pr' style={{fontSize: "clamp(0.6rem, 0.9vw, 1.1rem)"}}>Let’s get Ready for Next-Level Ping Pong</p>            
        }
        </div>
    )
}