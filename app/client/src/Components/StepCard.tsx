import React from 'react'


export default function StepCard({children, n} : {children: React.ReactNode, n:number}) {
    return (
        <div className=" bg-slate-600 m-2">
            <h2 className=''>
                STEP {n}
            </h2>
            {children}
        </div>
    )
}
