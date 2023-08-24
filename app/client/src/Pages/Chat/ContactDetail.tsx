import React from 'react'
import { PlayerData } from '../../../../global/Interfaces';
import useChatOverview from '../../Hooks/useChatOverview'; 



export default function ContactDetail ({id, avatar}: {id: number, avatar:string}) {
   
    const userOverview:PlayerData = useChatOverview(id)
    console.log('user overview: ', userOverview);
    
    if (userOverview == undefined)
        console.log('it s undefined');
        
    const AchievementsElements = userOverview?.stat?.achievements?.map((item:StatAchievement) => {
        return (
            <figure className="achievement">
                <img src={item.image} alt="" className="achievement-icon" />
                {/* <img src="" alt="" className="achievement-icon" /> */}
                <figcaption className="achievement-info">
                    <h5 className="achievement-title">{item?.badge_name}</h5>
                    <h6 className="achievement-subtitle">{item?.description}</h6>
                </figcaption>
            </figure>
        )
    })


    return (
        <div className="chat_overview">
            <div className="contact_details_container">
            <h2>Contact details</h2>
            <figure className="contact">
                {/* <img src="../src/Assets/cat.jpg" alt="cat" /> */}
                <img src={avatar} alt="cat" />
                <figcaption>
                    <h3>{userOverview?.firstname}</h3>
                    <h3>{userOverview?.lastname}</h3>
                    <h6>{userOverview?.stat?.ladder_level}</h6>
                    <div className="level_bar"></div>
                </figcaption>
            </figure>
                <div className="results">
                    <figcaption className="results-item">
                        <p>Games</p>
                        <h5>{userOverview?.stat?.wins! + userOverview?.stat?.losses!}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Wins</p>
                        <h5>{userOverview?.stat?.wins!}</h5>
                    </figcaption>
                    <figcaption className="results-item">
                        <p>Losses</p>
                        <h5>{userOverview?.stat?.losses!}</h5>
                    </figcaption>
                </div>
                <h2>Achievements</h2>
                <div className="achievement-container">
                    {AchievementsElements}
                </div>
        </div>  
        </div>
    );
}
