import { useAllAchievements } from "../Hooks/useAllAchievements"
import awardIcon from "../Assets/Icons/award.svg";
import ProfileImage from "./profileImage";
import locked from "../Assets/Icons/lock-solid.svg"
import unlocked from "../Assets/Icons/lock-open-solid.svg"
import {Achievement} from "../../../global/Interfaces"
import React from "react";

export default function AchievementCard({ achievements }: {achievements: Achievement[]}) {

    const allAchievements = useAllAchievements(achievements);

    const AchievementsToggle = allAchievements.map((award) => {
        return (
            <div className={`award-item ${String(award.is_achieved)}`} key={award.id}>
                <ProfileImage image={award.image} size="medium" />
                <div className="achievement-name">
                    <p>{award.badge_name}</p>
                    <span>{award.description}</span>
                </div>
                <div className="lock">
                    {
                        award.is_achieved ?
                        (<span><p>unlocked</p><img src={unlocked} alt="" /></span>) :
                        (<span><p>locked</p><img src={locked} alt="" /></span>)
                    }
                </div>
            </div>
        );
    });

    return (
        <div className="item achievementCard">
            <header>
                <p>Achievements</p>
                <div className="NbAchived">
                    <img width="32px" src={awardIcon} alt="" />
                    <span>
                        {allAchievements.filter((award) => award.is_achieved).length}/
                        {allAchievements.length} achievement
                    </span>
                </div>
            </header>
            <div className="all-awards-list">
                {AchievementsToggle}
            </div>
        </div>
    );
}
