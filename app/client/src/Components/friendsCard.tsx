import { useFetchAllFriends } from "../Hooks/useFetchAllFriends"
import friendsIcon from "../Assets/Icons/group.svg"
import {User} from "../../../global/Interfaces"
import UserInfoCard from "./UserInfoCard"
import React from "react";

export default function FriendsCard({ user }: {user: User}) {

    const allFriends = useFetchAllFriends(user?.id);

    const FriendsToggle = allFriends.map((friend) => {
        return (
            <UserInfoCard
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