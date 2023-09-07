import React from 'react'

interface PropType {
    children: React.ReactNode;
    n: number;
    heading: string;
    text: string;
}

export default function StepCard({children, n, heading, text} :PropType) {
    return (
        <div className=" bg-purple-600 m-2 rounded-xl w-72 px-2 pb-10 md:w-5/6 ">
            <div className="flex justify-center">
                <h2 className='text-center rounded-bl-md rounded-br-md bg-pink-500 text-xl px-4 font-bold'>
                    STEP {n}
                </h2>
            </div>
            <div className="flex justify-center mt-5">
                <h2 className='text-center des:text-sm w-2/3 font-bold de:text-xs'>{heading}</h2>
            </div>
            <div className="flex justify-center my-4">
                <p className='text-center w-3/4 text-xs'>{text}</p>
            </div>
           {children}
        </div>
    )
}
