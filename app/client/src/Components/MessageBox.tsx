import React from 'react'


export default function MessageBox ({children, id}) {
    return (
        <article className={`flex justify-${id ? "start" : "end"}`}>
            <p >{children}</p>
        </article>
    );
}