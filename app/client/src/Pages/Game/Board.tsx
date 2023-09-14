import React, { useContext } from 'react';
import UserContext from '../../Context/UserContext';
import PowerBar from './PowerBar';
import { Score } from './Interfaces';
import { User } from '../../../global/Interfaces';

export default function Board({score, oppUser}: {score: Score, oppUser: User}) {
    const {user} = useContext(UserContext);


    return (
        <div className='relative flex w-full'>
                <p id="username" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>{user.username}</p>
                <p id="username2" className='user absolute font-bold text-xs sm:text-xs md:text-md lg:text-base'>{oppUser?.username}</p>

                <PowerBar right={true} oppUser={oppUser}/>
                <PowerBar right={false} oppUser={oppUser}/>

                <div className='absolute w-full  flex text-2xl font-bold justify-center'>
                    <p className=" text-xl sm:text-xl md:text-2xl lg:text-3xl">{score.oppScore} - {score.myScore}</p>
                </div>
            </div>
    )
}