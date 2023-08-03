import { getAllFriends } from "../Hooks/getAllFriends"
import image from "../Assets/DreamShaper_32_young_pale_skinny_white_man_white_and_blue_hair_1.jpeg"
import losses from "../Assets/Icons/losses.svg"
import wins from "../Assets/Icons/wins.svg"
import friendsIcon from "../Assets/Icons/group.svg"

export default function ProfileImage({ user }) {

    const {allFriends} = getAllFriends(user?.id);

    const FriendsToggle = allFriends.map((friend) => {
        return (
            <>
                <div className="friend-item" key={friend.username}>
                    <div className="userImage">
                        <img src={image} alt="" />
                        <div className="status"></div>
                    </div>
                    <div className="friend-name">
                        <p>{friend.firstname + " " + friend.lastname}</p>
                        <span>{friend.username}</span>
                    </div>
                    <span><img src={wins} alt="" /> {friend.stat.wins + " wins"}</span>
                    <span><img src={losses} alt="" /> {friend.stat.losses + " losses"}</span>
                </div>
                <div className="friend-item" key={friend.username}>
                    <div className="userImage">
                        <img src={image} alt="" />
                        <div className="status"></div>
                    </div>
                    <div className="friend-name">
                        <p>{friend.firstname + " " + friend.lastname}</p>
                        <span>{friend.username}</span>
                    </div>
                    <span><img src={wins} alt="" /> {friend.stat.wins + " wins"}</span>
                    <span><img src={losses} alt="" /> {friend.stat.losses + " losses"}</span>
                </div>
                <div className="friend-item" key={friend.username}>
                    <div className="userImage">
                        <img src={image} alt="" />
                        <div className="status"></div>
                    </div>
                    <div className="friend-name">
                        <p>{friend.firstname + " " + friend.lastname}</p>
                        <span>{friend.username}</span>
                    </div>
                    <span><img src={wins} alt="" /> {friend.stat.wins + " wins"}</span>
                    <span><img src={losses} alt="" /> {friend.stat.losses + " losses"}</span>
                </div>
                <div className="friend-item" key={friend.username}>
                    <div className="userImage">
                        <img src={image} alt="" />
                        <div className="status"></div>
                    </div>
                    <div className="friend-name">
                        <p>{friend.firstname + " " + friend.lastname}</p>
                        <span>{friend.username}</span>
                    </div>
                    <span><img src={wins} alt="" /> {friend.stat.wins + " wins"}</span>
                    <span><img src={losses} alt="" /> {friend.stat.losses + " losses"}</span>
                </div>
            </>
        );
    });

    return (
        <div className="item friendsCard">
            <header>
                <p>Friends</p>
                <div className="NbFriends">
                    <img src={friendsIcon} alt="" />
                    <span>
                    {
                        allFriends.length > 1 ?
                        allFriends.length + " friends" :
                        allFriends.length + " friend"
                    }
                    </span>
                </div>
            </header>
            <div className="all-friends-list">
                {FriendsToggle}
            </div>
        </div>
    );
}
