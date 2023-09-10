import React, { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import PowerBar from './PowerBar';
import { Score } from './Interfaces';

export default function Board({score}: {score: Score}) {
    const {user} = useContext(UserContext);


    return (
        <div className='relative flex w-full'>
                <p id="username" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>{user.username}</p>
                <p id="username2" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>ijmari</p>

                <PowerBar right={true}/>
                <PowerBar right={false}/>

                <div className='absolute w-full  flex text-2xl font-bold justify-center'>
                    <p className=" text-xl sm:text-xl md:text-2xl lg:text-3xl">{score.oppScore} - {score.myScore}</p>
                </div>
            </div>
    )
}