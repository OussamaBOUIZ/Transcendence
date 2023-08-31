import "../../scss/friendsComponent.scss";
import { useFetchAllFriends } from "../../Hooks/useFetchAllFriends"
import ProfileImage from "../../Components/profileImage";
import React, {useContext} from "react";
import UserContext from "../../Context/UserContext";


export default function FriendsComponent() {

    const {user} = useContext(UserContext)
    const allFriends = useFetchAllFriends(user?.id);

    const FriendsMessage = <div className="friend-empty">
        <p>Looks like you're new here and you don't have any friends yet</p>
        <p><span>Make</span> some new <span>friends</span> and start having fun!</p>
    </div>

    const FriendsToggle = allFriends.map((friend) => {
        return (
            <>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            <div className="friend-item" key={friend.id}>
                <header>
                    <ProfileImage image={friend.image} size="big" />
                    <div className="text-item">
                        <h2>{friend.firstname}</h2>
                        <h2>{friend.lastname}</h2>
                        <span>{friend.status}</span>
                    </div>
                    <div className="level-item">
                        <p>level</p>
                        <p>{friend.stat.ladder_level}</p>
                    </div>
                </header>
                <main>
                    <p>lastGame:</p>
                    <p>3 - 0</p>
                </main>
            </div>
            </>
        )
    })

    if (!user) {
        return null;
    }
    
    return (
        <div className="friendsComponent">
            <p>My friends</p>
            <div className="friends-list">
                {allFriends && FriendsToggle}
                {!allFriends && FriendsMessage}
            </div>
        </div>
    )
}