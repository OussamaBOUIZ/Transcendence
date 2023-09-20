import "../../scss/friendsComponent.scss";
import { useFetchAllFriends } from "../../Hooks/useFetchAllFriends"
import ProfileImage from "../../Components/profileImage";
import React, {useContext} from "react";
import UserContext from "../../Context/UserContext";


export default function FriendsComponent() {

    const {user} = useContext(UserContext)
    const allFriends = useFetchAllFriends(user?.id);

    const FriendsMessage = <div className="friend-empty bg-primary-pink bg-opacity-20 rounded-2xl">
        <p>Looks like you're new here and you don't have any friends yet</p>
        <p><span>Make</span> some new <span>friends</span> and start having fun!</p>
    </div>

    const FriendsToggle = allFriends.map((friend) => {
        let result: React.JSX.Element;
        console.log(friend.lastGame);
        
        if (typeof friend.lastGame === 'string') {
            result = (
                <main>
                    <p>No game yet</p>
                </main>
            );
        } else {
            const isUserLastGame = friend.lastGame.id === user.id;
            const userScore = isUserLastGame ? friend.lastGame.user_score : friend.lastGame.opponent_score;
            const friendScore = isUserLastGame ? friend.lastGame.opponent_score : friend.lastGame.user_score;

            result = (
                <main>
                    <p>Last Game</p>
                    <p>{userScore} - {friendScore}</p>
                </main>
            );
        }

        let statusIcon: string;

        switch (friend.status) {
            case "Online":
                statusIcon = "bg-green-500";
                break;
            case "Offline":
                statusIcon = "bg-slate-600";
                break;
            default:
                statusIcon = "bg-pink-500";
                break;
        }

        return (
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} name={friend.username} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${statusIcon}`}></div>
                            <span>{friend.status}</span>
                        </div>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                {result}
            </div>
        )
    })

    if (!user) {
        return null;
    }
    
    return (
        <div className="friendsComponent">
            <p>My friends</p>
            <div className="friends-list rounded-2xl">
                {allFriends.length > 0 && FriendsToggle}
                {!allFriends.length && FriendsMessage}
            </div>
        </div>
    )
}