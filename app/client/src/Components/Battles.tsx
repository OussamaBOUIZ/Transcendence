import Character from "../Assets/character.png"

export default function LeaderBoard() {
    return (
        <>
            <div className="item battleRoyal">
                <div className="cover"></div>
                <img src={Character} alt="" />
                <div className="BattleRoyalCover" >
                    <span>Battle Royal</span>
                    <p>Play the game and get extra coins in our Battle Royal</p>
                    <button className='PlayButton' ><span>Play</span></button>
                </div>
            </div>
            <div className="item theBeast">
                <span>TheBeast</span>
            </div>
            <div className="item SpiderGround">
                <span>SpiderGround</span>
            </div>
            <div className="item BrightGround">
                <span>BrightGround</span>
            </div>
        </>
    )
}