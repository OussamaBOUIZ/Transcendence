import React, { SetStateAction } from 'react';
import ModeCard from './ModeCard';

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




export default function GameCards ({hostId, guestId, setter}: {hostId: string, guestId: string, setter: React.Dispatch<SetStateAction<boolean>>}) {
    return (
    <div id='game-modes' className="absolute w-screen h-screen top-0 left-0 z-50 bg-gray-700 bg-opacity-80"
    >
        <header className='p-6 '>
            <button name='back' className='text-xl font-semibold'
            onClick={() => setter((prevVal:boolean) => !prevVal)}
            >
              <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/long-arrow-left.png" alt="long-arrow-left"/>
            </button>
        </header>

        <section className='game-modes-container h-5/6 px-20 w-2/3 mx-auto'>
          <div className="flex justify-around my-5 flex-wrap gap-y-10">
            {data.map((item) => {
              return (
                <ModeCard 
                name={item.name} 
                image={item.image}
                desc={item.description}
                hostId={hostId}
                guestId={guestId}
            />
              )
            })}      
          </div>
        </section>
    </div>
    );
}