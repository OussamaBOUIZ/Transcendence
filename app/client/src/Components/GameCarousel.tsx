import React from 'react';
import Swiper from 'swiper';
import {Navigation,  Pagination } from 'swiper/modules'

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
    speed: 600,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: false,
    },
  });

export default function GameCarousel () {
    return (
    <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-violet-700 bg-opacity-80">
        <header className='p-6 bg-slate-500'>
            <button name='back' className='text-xl font-semibold hover:underline'> Go Back</button>
        </header>
        <div>
            

        </div>

    </div>
    );
}