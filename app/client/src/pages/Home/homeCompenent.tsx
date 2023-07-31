import "../../scss/homeCompenent.scss";
import GameHistory from '../../components/gameHistory';
import LeaderBoard from '../../components/leaderBoard';
import Battles from '../../components/Battles';

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