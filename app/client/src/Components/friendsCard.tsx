import { useFetchAllFriends } from "../Hooks/useFetchAllFriends"
import friendsIcon from "../Assets/Icons/group.svg"
import UserInfoCard from "./UserInfoCard"
import React from "react";

export default function FriendsCard({ id, update, setIsMyFriend }: {id: number, update: number, setIsMyFriend: React.Dispatch<React.SetStateAction<boolean>>}) {

    const allFriends = useFetchAllFriends(id, update, setIsMyFriend);

    const FriendsToggle = allFriends.map((friend) => {
        return (
            <UserInfoCard
            key={friend.id}
            image={friend.image}
            status={friend.status}
            firstname={friend.firstname}
            lastname={friend.lastname}
            username={friend.username}
            wins={friend.stat.wins}
            losses={friend.stat.losses}
            flex="row"
            id={friend.id}
            isUnderMyGrade={false}
        />
        );
    });

    return (
        <div className="item friendsCard">
            <header>
                <p>Friends</p>
                <div className="NbFriends">
                    <img width="32px" src={friendsIcon} alt="" />
                    <span>
                    {
                        allFriends.length > 1 ?
                        String(allFriends.length) + " friends" :
                        String(allFriends.length) + " friend"
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