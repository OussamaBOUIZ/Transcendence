import React from 'react'
interface PropType {
    image: string;
    store:string;
    link: string
}
// [@media(min-width:711px)]:bg-green-500
export default function DownloadCard ({image, store, link} : PropType ) {
    return (
        <a href={link} className=' cursor-pointer'>
            <div className="bg-purple-800 hover:bg-purple-900 p-2 rounded-xl flex items-center gap-5 my-3 mx-5 download-card">
                <img src={image} alt="Downlaod" 
                className=' w-12 desk:w-10 des:h-10'/>
                <article>
                    <p className='text-sm desk:text-xs'>Available on</p>
                    <h3 className='font-bold desk:text-sm de:text-xs'>{store}</h3>
                </article>
            </div>
        </a>
    );
}