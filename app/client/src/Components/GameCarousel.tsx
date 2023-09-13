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



interface PropType {
  name:string;
  image:string;
  hostId:string;
  guestId:string;
}

function ModeCard({name, image, hostId, guestId}: PropType) {
  return (
    <Link to={`/game/${name.split(' ').join('').toLowerCase()}/${hostId}${guestId}`}>
      <figure style={{backgroundImage: `url(${image})` }}
        className=" relative rounded-xl w-80 h-64  bg-no-repeat bg-cover bg-center overflow-hidden  bg-gradient-to-t from-gray-900 via-transparent to-transparent"
      >
      <figure className='absolute inset-0 p-6 bg-gradient-to-t from-black via-transparent to-transparent  flex justify-center items-end'>
          <h2 className="mb-1 text-xl font-bold">{name}</h2>
      </figure>
      </figure>
    </Link>
  )
}

export default function GameCarousel ({hostId, guestId}: {hostId: string, guestId: string}) {
     const closeWindow = (e: Event) => {
        // document.getElementById("game-modes").style.display = "none";
        console.log('close window');
     }
    return (
    <div id='game-modes' className="absolute w-screen h-screen top-0 left-0 z-50 bg-violet-700 bg-opacity-80">
        <header className='p-6 bg-slate-500'>
            <button name='back' className='text-xl font-semibold hover:underline'
            onClick={closeWindow}
            >Go Back</button>
        </header>

        <section className='game-modes-container h-5/6 px-20 w-3/4 mx-auto'>
          <div className="flex justify-between my-5">
            <ModeCard 
            name="Battle Royal" 
            image="/src/Assets/GameArea/galaxy.jpg"
            hostId={hostId}
            guestId={guestId}
            />      
            <ModeCard 
            name="Blazing Pong" 
            image="/src/Assets/GameArea/snowy-mount.jpg"
            hostId={hostId}
            guestId={guestId}
            />      
          </div>
          <div className="flex justify-between my-5">
            <ModeCard 
            name="Arctic Pong" 
            image="/src/Assets/GameArea/arcticarea.jpg"
            hostId={hostId}
            guestId={guestId}
            />      
            <ModeCard 
            name="Retro Pong" 
            image="/src/Assets/GameArea/RetroPong.jpg"
            hostId={hostId}
            guestId={guestId}
            />      
          </div>
        </section>
    </div>
    );
}