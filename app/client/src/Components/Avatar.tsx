import React from 'react'
import {Link} from 'react-router-dom'

interface PropType {
    username: string,
    imgSource: string,
    status: string
}

export default function Avatar ({username, imgSource, status}: PropType) {
    return (
        <Link to={`/profile/${username}`} className=''>
            <div className="relative mx-0.5">
                <img
                src={imgSource} 
                alt="profile title" 
                className='rounded-full h-12 w-12 object-cover max-w-none'
                />
                <span className={`absolute rounded-full h-4 w-4 right-0 top-0 bg-green-500 ${status !== "Online" ? "border-2 border-pink-500" : ""}`}></span>
            </div>
        </Link>
    );
}