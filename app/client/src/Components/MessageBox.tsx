import React from 'react'


export default function MessageBox ({children, username, avatar, id}) {
    return (
        <article className={`flex ${id ? "items-start" : "items-end"} my-3 flex-col`}>
            {id && <p className='ml-14 font-medium text-sm mb-1 lowercase'>{username}</p>}
            <div className={`UserMessage flex ${id ? "ml-2": "mr-2"}`}>
                {id && avatar && <img className="w-9 h-9 rounded-full mr-2" src={avatar} alt="" />}
                <p className={`max-w-sm break-all px-4 py-3 ${id ? 'bg-messages rounded-tl-none' : 'bg-my-messages rounded-tr-none'} rounded-2xl`}>{children}</p>
            </div>
        </article>
    );
}