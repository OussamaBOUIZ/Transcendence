import React from "react";
import rectangle from "../../Assets/Rectangle.svg"
import card1 from "../../Assets/Card-1.svg"
import { Link } from "react-router-dom";


export default function GameInfo1() {
    return (
        <div id="gameInfo" className="gameInfo h-screen bg-black">
            <div className="content h-full flex justify-between items-center px-28">
                <img src={card1} alt="" />
                <figure className="w-2/5 flex flex-col gap-4">
                    <div className="flex gap-4 items-center font-semibold">
                        <img src={rectangle} alt="" />
                        <h1>Get ready for an immersive gaming experience!</h1>
                    </div>
                    <p>
                    Dive into the captivating world of PONG and unleash your inner hero!
                    Embark on epic quests, battle ferocious enemies, and discover hidden treasures.
                    Choose from a wide range of powerful characters, each with unique abilities and playstyles.
                    Engage in thrilling PvP battles and prove your dominance in intense multiplayer arenas.
                    Explore vast, breathtaking landscapes filled with stunning visuals and immersive soundtracks.
                    Stay updated with regular content updates, new challenges, and exciting events to keep the adventure fresh and exciting.
                    </p>
                    <Link to='/sign' className="button">Play Now</Link>
                </figure>
            </div>
        </div>
    )
}