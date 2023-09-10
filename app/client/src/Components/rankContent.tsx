import StarRank from './starRank';
import ProfileImage from './profileImage';
import React from 'react';
import {Leaders} from "../../global/Interfaces"

export default function RankContent({userData, size, Rank}: {userData: Leaders, size: string, Rank: number}) {

    return (
        <div className="rankContent">
            <span><h4>{`level ${userData?.ladder_level}`}</h4></span>
            <StarRank RankNumber={Rank} color="#E72FD0" />
            <ProfileImage image={userData.image} name={userData.user.username} size={size} />
            <span>{userData.user.username}</span>
        </div>
    )
}