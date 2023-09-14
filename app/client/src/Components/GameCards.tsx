import React, { SetStateAction, useState } from 'react';
import ModeCard from './ModeCard';
import '../scss/gameCards.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import left from "../Assets/Icons/arrow.png"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const data = [
  {
    "name": "Battle Royal",
    "image": "/src/Assets/GameArea/galaxy.jpg",
    "description": "Embrace thrilling challenges, face fierce opponents",
  },
  {
    "name": "Blazing Pong", 
    "image": "/src/Assets/GameArea/snowy-mount.jpg",
    "description": "Defeat rivals in intense head-to-head battles",
  },
  {
    "name": "Arctic Pong",
    "image": "/src/Assets/GameArea/arcticarea.jpg", 
    "description": "Unleash your competitive spirit in Arctic Area"
  },
  {
     "name": "Retro Pong",
     "image": "/src/Assets/GameArea/RetroPong.jpg",
     "description": "Outmatch, outplay, and claim victory over opponents."  
  }
]




// export default function GameCards ({hostId, guestId, setter}: {hostId: number, guestId: number, setter: React.Dispatch<SetStateAction<boolean>>}) {
//     return (
//     <div id='game-modes' className="absolute w-screen h-screen top-0 left-0 z-50 bg-gray-700 bg-opacity-80"
//     >
//         <header className='p-6 '>
//             <button name='back' className='text-xl font-semibold'
//             onClick={() => setter((prevVal:boolean) => !prevVal)}
//             >
//               <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/long-arrow-left.png" alt="long-arrow-left"/>
//             </button>
//         </header>

//         <section className='game-modes-container h-5/6 px-20 w-2/3 mx-auto'>
//           <div className="flex justify-around my-5 flex-wrap gap-y-10">
//             {data.map((item) => {
//               return (
//                 <ModeCard 
//                 name={item.name} 
//                 image={item.image}
//                 desc={item.description}
//                 hostId={hostId}
//                 guestId={guestId}
//             />
//               )
//             })}      
//           </div>
//         </section>
//     </div>
//     );
// }

function handleInv() {
  socket?.emit('receiveInvitation', {userId: hostId, guestId: guestId})
}

export default function GameCards ({hostId, guestId, setter}: {hostId: number, guestId: number, setter: React.Dispatch<SetStateAction<boolean>>}) {
    return (
    <div id='game-modes' className="absolute flex flex-col justify-center w-screen h-screen top-0 left-0 z-50 bg-gray-700 bg-opacity-80"
    >
        <header className='absolute top-0 p-6 '>
            <button name='back' className='text-xl font-semibold'
            onClick={() => setter((prevVal:boolean) => !prevVal)}
            >
              <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/long-arrow-left.png" alt="long-arrow-left"/>
            </button>
        </header>

        <Swiper
          effect='coverflow'
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={
            {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }
          }
          pagination={{el:'.swiper-pagination', clickable:true}}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className='swiper-container'
        >
          {data.map((item) => {
            return (
            <SwiperSlide>
              <img src={item.image} alt={item.name} onClick={handleInv}/>
                <figure className='absolute bottom-0 pb-4 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex justify-center items-end'>
                    <h2 className="mb-1 text-xl font-bold">{item.name}</h2>
                </figure>
            </SwiperSlide>
            )
          })}
          <div className="slider-controler flex justify-center items-center">
            <div className="swiper-button-prev slider-arrow">
              <BsArrowLeftCircle />
            </div>
            <div className="swiper-button-next slider-arrow">
              <BsArrowRightCircle />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
    </div>
    );
}