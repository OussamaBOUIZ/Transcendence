import React from 'react'


export default function MessageBox ({children, id}) {
    return (
        <article className={`flex ${id ? "justify-start" : "justify-end"} my-3`}>
            <p className={`max-w-sm break-all p-4 ${id ? 'bg-purple-500' : 'bg-pink-400'} rounded-md ${id ? "ml-2": "mr-2"}`}>{children}</p>
        </article>
    );
}