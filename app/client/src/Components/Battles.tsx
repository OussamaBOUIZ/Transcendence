import React from 'react'

export default function Battles() {
    return (
        <>
            <div className="item battleRoyal">
                <div className="BattleRoyalCover w-3/4" >
                    <span className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl">Battle Royal</span>
                    <p className="mt-0 font-light sm:text-xs md:text-base lg:text-lg">Play the game and get extra coins in our Battle Royal</p>
                    <button className='PlayButton px-14 py-2 lg:px-16 lg:py-2 md:px-14 md:py-2' ><span>Play</span></button>
                </div>
            </div>
            <div className="item theBeast">
                <span className="text-2xl sm:text-3xlmd:text-2xl lg:text-3xl">TheBeast</span>
            </div>
            <div className="item SpiderGround">
                <span className="text-2xl sm:text-3xlmd:text-2xl lg:text-3xl">SpiderGround</span>
            </div>
            <div className="item BrightGround">
                <span className="text-2xl sm:text-3xlmd:text-2xl lg:text-3xl">BrightGround</span>
            </div>
        </>
    )
}