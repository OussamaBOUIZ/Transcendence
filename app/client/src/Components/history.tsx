import ProfileImage from "./profileImage";
import {User} from "../../../global/Interfaces"
import "../scss/history.scss";

export default function History({userData}: {userData: User | null}) {
    const score = "3-0"
    const opponent = "ijmari"

    return (
        <div className="contentBar">
            <div className="history">
                <ProfileImage image={userData?.image} size="small" />
                <span>{userData?.username}</span>
                <span className="score">{score}</span>
                <span>{opponent}</span>
                <ProfileImage image={userData?.image} size="small" />
            </div>
        </div>
        
    )
}