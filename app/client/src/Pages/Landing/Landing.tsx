import React from "react";
import Cover from "./cover.tsx"
import GameInfo1 from "./gameInfo1.tsx"
import GameInfo2 from "./gameInfo2.tsx"
import About from "./about.tsx"
import Team from "./team.tsx"
import "../../scss/landing.scss"

export default function Landing() {
    return (
        <div className="landing w-full h-full">
            <Cover />
            <GameInfo1 />
            <GameInfo2 />
            <About />
            <Team />
        </div>
    )
}