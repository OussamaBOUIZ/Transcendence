import React from 'react'
interface PropType {
    image: string;
    store:string;
    link: string
}
export default function DownloadCard ({image, store, link} : PropType ) {
    return (
        <a href={link} className=' cursor-pointer'>
            <div className="bg-purple-800 hover:bg-purple-900 p-2 rounded-xl flex gap-5 my-3 mx-5">
                <img src={image} alt="Downlaod" 
                className=' w-12'/>
                <article>
                    <p className='text-sm'>Available on the</p>
                    <h3 className='font-bold'>{store}</h3>
                </article>
            </div>
        </a>
    );
}