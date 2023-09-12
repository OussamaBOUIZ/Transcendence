import React from 'react';
import {Link} from 'react-router-dom';

const data = [
  {
    "name": "Battle Royal",
    "image": "/src/Assets/GameArea/galaxy.jpg",
    "description": "Play through the story alone against AI opponents",
  },
  {
    "name": "Blazing Pong", 
    "image": "/src/Assets/GameArea/snowy-mount.jpg",
    "description": "Team up with friends to complete missions together",
  },
  {
    "name": "Arctic Pong",
    "image": "/src/Assets/GameArea/arcticarea.jpg", 
    "description": "Compete head-to-head against other players",
  },
  {
     "name": "Retro Pong",
     "image": "/src/Assets/GameArea/RetroPong.jpg",
     "description": "See how long you can last against endless waves of enemies",  
  }
]

function ModeCard({name, image}) {
  return (
    <Link>
      <figure style={{backgroundImage: `url(${image})`}}
        className="rounded-xl flex justify-center items-end w-96 h-64 p-10 bg-no-repeat bg-cover bg-center"
      >
          <h2>{name}</h2>
      </figure>
    </Link>
  )
}

export default function GameCarousel () {
    return (
    <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-violet-700 bg-opacity-80">
        <header className='p-6 bg-slate-500'>
            <button name='back' className='text-xl font-semibold hover:underline'> Go Back</button>
        </header>
        <section className='game-modes-container h-5/6 px-20'>
          <div className="flex justify-between my-5">
            <ModeCard name="Battle Royal" image="/src/Assets/GameArea/galaxy.jpg"/>      
            <ModeCard name="Blazing Pong" image="/src/Assets/GameArea/snowy-mount.jpg"/>      
          </div>
          <div className="flex justify-between my-5">
            <ModeCard name="Arctic Pong" image="/src/Assets/GameArea/arcticarea.jpg"/>      
            <ModeCard name="Retro Pong" image="/src/Assets/GameArea/RetroPong.jpg"/>      
          </div>
        </section>
    </div>
    );
}