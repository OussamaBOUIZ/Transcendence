import History from "./history";
import {User} from "../../../global/Interfaces"

export default function GameHistory({UserData}: {UserData: User}) {

      return (
        <div className="item GameHistory">
            <p>Game History</p>
            <div className="games">
                <History userData={UserData} />
                <History userData={UserData} />
                <History userData={UserData} />
            </div>
        </div>
    )
}