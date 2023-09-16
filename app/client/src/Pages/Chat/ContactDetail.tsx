import React, { useContext, useEffect, useState } from 'react'
import { User, Achievement } from '../../../global/Interfaces';
import { HiOutlineX } from "react-icons/hi";
import UserContext from '../../Context/UserContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { capitalize } from '../../Helpers/utils';
import LevelBar from '../../Components/LevelBar';
import { getAchievementImage } from '../../Hooks/getAchievementImage';

function AllAchievement ({item} :{item: Achievement}) {
    const [image, setImage] = useState<string>()


    useEffect(() => {
        const getImage = async () => {
            setImage(await getAchievementImage(item.id));
        }
        void getImage();
    }, [])

    return (
        <figure className="achievement">
            <img src={image} alt="" className="achievement-icon" />
            <figcaption className="achievement-info">
                <h5 className="text-sm font-semibold">{item?.badge_name}</h5>
                <p className="text-[10px]">{item?.description}</p>
            </figcaption>
        </figure>
    )
}

export default function ContactDetail ({title, oview} : {title: string, oview?: User}) {
    
    const {setShow} = useContext(UserContext)
    const AchievementsElements = oview?.stat?.achievements?.map((item) => <AllAchievement key={item.id} item={item} />)
    const isSmallDevice = useMediaQuery("only screen and (max-width : 820px)");

    return (
        <div className="contact_details_container relative">
            <h2 className='mb-4'>{title}</h2>
            {isSmallDevice && <HiOutlineX className="absolute top-4 right-4 w-6 h-6 cursor-pointer" onClick={() => setShow('main')}/>}
            <figure className="contact">
                <img src={oview?.image} alt="cat" />
                <figcaption>
                    <h3 className='font-bold'>{capitalize(oview?.firstname)}</h3>
                    <h3 className='font-bold'>{capitalize(oview?.lastname)}</h3>
                    <h6>level {String(oview?.stat?.ladder_level)}</h6>
                    <LevelBar val={String(oview?.stat?.levelPercentage)} />
                </figcaption>
            </figure>
            <div className="results">
                <figcaption className="results-item">
                    <p>Games</p>
                    <h5>{String(Number(oview?.stat?.wins) + Number(oview?.stat?.losses))}</h5>
                </figcaption>
                <figcaption className="results-item">
                    <p>Wins</p>
                    <h5>{oview?.stat?.wins!}</h5>
                </figcaption>
                <figcaption className="results-item">
                    <p>Losses</p>
                    <h5>{oview?.stat?.losses!}</h5>
                </figcaption>
            </div>
            <h2>Achievements</h2>
            <div className="achievement-container">
                {AchievementsElements}
            </div>
        </div>  
    );
}
