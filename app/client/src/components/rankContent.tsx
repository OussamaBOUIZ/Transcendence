import React from 'react';
import StarRank from './starRank';
import ProfileImage from './profileImage';

export default function RankContent({size}) {
    return (
        <div className="rankContent">
            <span><h4>level 14</h4></span>
            <StarRank RankNumber="1" />
            <ProfileImage userData="small" size={size} />
            <span>oouazize</span>
        </div>
    )
}