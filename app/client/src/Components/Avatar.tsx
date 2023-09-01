import React from 'react'
import {Link} from 'react-router-dom'

interface PropType {
    profileId: number,
    imgSource: string
}

export default function Avatar ({profileId, imgSource}: PropType) {
    return (
        <Link to={`/profile/${profileId}`}>
            <img
            src={imgSource} 
            alt="profile title" 
            className='rounded-full h-12 w-12 object-cover relative'
            />
            <span className="absolute rounded-full h-1 w-1 r-0 t-0 bg-pink-500"></span>
        </Link>
    );
}