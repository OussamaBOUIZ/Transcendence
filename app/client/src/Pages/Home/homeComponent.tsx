import "../../scss/homeComponent.scss";
import GameHistory from '../../Components/gameHistory';
import LeaderBoard from '../../Components/leaderBoard';
import Battles from '../../Components/Battles';
import {User, Leaders} from "../../../../global/Interfaces"

export default function HomeComponent({ UserData , Leaders} : {UserData: User | null, Leaders: Leaders[]}) {

    return (
        <>
            <div className="backgroundHomeShadow"></div>
            <div className="leaderboardShadow"></div>
            <div className="homeComponent">
                <Battles />
                <LeaderBoard leaders={Leaders} />
                <GameHistory UserData={UserData} />
            </div>
        </>
    )
}