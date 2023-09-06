import React, { Children } from 'react'

interface PropType {
    children: React.ReactNode;
    username?: string;
    avatar?: string;
    id: boolean;
    isBlocked?: boolean;
}

export default function MessageBox ({children, username, avatar, id, isBlocked}: PropType) {
    const styleHiddenMessage = (isBlocked) ? 'bg-room-active-bar opacity-80' : 'bg-messages rounded-tl-none'

    const handleClick = () => window.location.replace(`/profile/${String(username)}`)
    return (
        <article className={`flex ${id ? "items-start" : "items-end"} my-3 flex-col`}>
            {id && <p className='ml-14 font-medium text-sm mb-1 lowercase'>{username}</p>}
            <div className={`UserMessage flex ${id ? "ml-2": "mr-2"}`}>
                {id && avatar && <img className="w-9 h-9 rounded-full mr-2 cursor-pointer" src={avatar} alt="" onClick={handleClick}/>}
                <p className={`max-w-sm break-all ${isBlocked ? 'py-2' : 'py-3'} px-4 ${id ? styleHiddenMessage : 'bg-my-messages rounded-tr-none'} rounded-2xl`}>{children}</p>
            </div>
        </article>
    );
}
