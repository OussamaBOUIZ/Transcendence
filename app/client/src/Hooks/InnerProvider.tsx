import React from "react"

export default function InnerProvider({children, innerDiv}) {
    return (
        <div
            ref={innerDiv} style={{position: 'relative'}}>
            {children}
        </div>
    )
}