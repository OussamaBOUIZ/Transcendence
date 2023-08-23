import React from "react"

export default function OuterProvider({children, className, outerDiv}) {
    return (
        <div
            ref={outerDiv} className={className} style={{position: 'relative', height: '100%', overflowY: 'scroll'}}>
            {children}
        </div>
    )
}