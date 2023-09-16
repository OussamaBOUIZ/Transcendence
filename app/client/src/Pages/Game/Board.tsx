import React, { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import PowerBar from './PowerBar';
import { Score } from './Interfaces';
import { User } from '../../../global/Interfaces';

export default function Board({score, oppUser, isHost}: {score: Score, oppUser: User, isHost: boolean}) {
    const {user} = useContext(UserContext);
    let hostScore = score.myScore;
    let guestScore = score.oppScore;

    if (!isHost) {
        hostScore = score.oppScore;
        guestScore = score.myScore;
    }


    return (
        <div className='relative flex w-full'>
            <p id="username" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>{ isHost ? user.username : oppUser?.username }</p>
            <p id="username2" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>{ isHost ? oppUser?.username : user.username }</p>


            <PowerBar right={true} oppUser={oppUser}/>
            <PowerBar right={false} oppUser={oppUser}/>

            <div className='absolute w-full  flex text-2xl font-bold justify-center'>
                    <p className=" text-xl sm:text-xl md:text-xl lg:text-xl">
                        {hostScore} - {guestScore}
                    </p>
            </div>
        </div>
    )
}