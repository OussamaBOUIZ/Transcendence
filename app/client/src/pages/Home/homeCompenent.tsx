import "../../scss/homeCompenent.scss";
import GameHistory from '../../Components/gameHistory';
import LeaderBoard from '../../Components/leaderBoard';
import Battles from '../../Components/Battles';

export default function HomeCompenent({ UserData , Leaders}) {

    return (
        <>
            <div className="backgroundHomeShadow"></div>
            <div className="leaderboardShadow"></div>
            <div className="homeCompenent">
                <Battles />
                <LeaderBoard leaders={Leaders} />
                <GameHistory UserData={UserData} />
            </div>
        </>
    )
}