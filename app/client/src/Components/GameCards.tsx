import React, { SetStateAction, useContext } from 'react';
import '../scss/gameCards.scss'
import {FaSignOutAlt} from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import UserContext from '../Context/UserContext';
import {handleClickOutside} from "../Helpers/utils"


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

export default function GameCards ({hostId, guestId, setPopupOpen}: {hostId: number, guestId: number, setPopupOpen: React.Dispatch<SetStateAction<boolean>>}) {
  
  const {socket} = useContext(UserContext)
  const wrapperRef = handleClickOutside(setPopupOpen)

  function handleInv() {
    const sliderActive = document.querySelector('.swiper-slide-active')
    const imgElement = sliderActive?.querySelector('img');
    const gameName = imgElement?.getAttribute('alt');
    socket?.emit('receiveInvitation', {userId: hostId, guestId: guestId, gameName: gameName})
  }
  
  return (
    <div id='game-modes' className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 z-50"
    >
        <div className="logout absolute cursor-pointer z-50"
          onClick={() => setPopupOpen(false)}>
          <FaSignOutAlt />
        </div>

        <section className='swiper-parent w-full sm:w-11/12 lg:w-2/3' ref={wrapperRef}>
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
              hideOnClick: false,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className='swiper-container'
          >
            {data.map((item) => {
              return (
              <SwiperSlide>
                <img src={item.image} alt={item.name} />
                  <figure className='absolute bottom-0 pb-4 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex justify-center items-end'>
                      <h2 className="mb-1 text-xl font-bold">{item.name}</h2>
                  </figure>
              </SwiperSlide>
              )
            })}
            <div className="slider-controler flex justify-center items-center">
              <div className="swiper-button-prev slider-arrow">
                <BsArrowLeftCircle color="white" />
              </div>
              <div className="swiper-button-next slider-arrow">
                <BsArrowRightCircle color="white" />
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
          <button className='px-9 py-1 bg-primary-pink rounded-xl -mb-8 font-semibold' onClick={handleInv}>Play Now</button>
        </section>
    </div>
    );
}