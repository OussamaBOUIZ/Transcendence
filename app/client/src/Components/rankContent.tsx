import StarRank from './starRank';
import ProfileImage from './profileImage';

export default function RankContent({userData, size, Rank}) {

    return (
        <div className="rankContent">
            <span><h4>{`level ${userData?.ladder_level}`}</h4></span>
            <StarRank RankNumber={Rank} color="#E72FD0" />
            <ProfileImage image={userData?.image} size={size} />
            <span>{userData?.user?.username}</span>
        </div>
    )
}