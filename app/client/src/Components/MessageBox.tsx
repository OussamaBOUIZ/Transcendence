import React from 'react'

const flexEnd = {
    justifyContent: "flex-end"
}

const flexStart = {
    justifyContent: "flex-start"
}

export default function MessageBox ({children, id}) {
    return (
        <article className={`flex my-3`} style={id ? flexEnd : flexStart}>
            <p className={`max-w-sm break-all p-4 ${id ? 'bg-pink-500' : 'bg-purple-400'} rounded-md ${id ? "ml-2": "mr-2"}`}>{children}</p>
        </article>
    );
}