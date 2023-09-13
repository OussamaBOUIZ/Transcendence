import React, { useState } from 'react';
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
  desc:string;
  hostId:string;
  guestId:string;
}

function ModeCard({name, image, desc, hostId, guestId}: PropType) {
  
  const [descStyle, setDescStyle] = useState({
    visibility: "hidden",
  });
  const [shadowStyle, setShadowStyle] = useState({});

  const handleOnMouseEnter = () => {
    console.log('mouse enter');
    setDescStyle({visibility: "visible"})
    setShadowStyle({boxShadow: ""})
    console.log("descStyle", descStyle)
  }

  const handleOnMouseLeave = () => {
    console.log('mouse enter');
    setDescStyle({visibility: "hidden"})
    console.log("descStyle", descStyle)
  }

  return (
    <Link to={`/game/${name.split(' ').join('').toLowerCase()}/${hostId}${guestId}`}
    >
      <figure style={{backgroundImage: `url(${image})` }}
        className=" relative rounded-xl w-72 h-52  bg-no-repeat bg-cover bg-center overflow-hidden"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
      <figure className='absolute inset-0 p-6 bg-gradient-to-t from-black  to-transparent  flex justify-center items-end'>
          <h2 className="mb-1 text-xl font-bold">{name}</h2>
      </figure>
      <figure style={descStyle} className={`absolute inset-0 bg-gray-900 opacity-70 p-6 flex justify-center items-center ease-out`}
      >
          <p className='text-center'>{desc}</p>
      </figure>
      </figure>
    </Link>
  )
}

export default function GameCarousel ({hostId, guestId, toggle}: {hostId: string, guestId: string, toggle: () => void}) {
    return (
    <div id='game-modes' className="absolute w-screen h-screen top-0 left-0 z-50 bg-gray-700 bg-opacity-80">
        <header className='p-6 '>
            <button name='back' className='text-xl font-semibold hover:underline'
            onClick={toggle}
            >Go Back</button>
        </header>

        <section className='game-modes-container h-5/6 px-20 w-2/3 mx-auto'>
          <div className="flex justify-around my-5 flex-wrap gap-y-10">
            <ModeCard 
            name="Battle Royal" 
            image="/src/Assets/GameArea/galaxy.jpg"
            desc="Play through the story alone against AI opponents"
            hostId={hostId}
            guestId={guestId}
            />      
            <ModeCard 
            name="Blazing Pong" 
            image="/src/Assets/GameArea/snowy-mount.jpg"
            desc="Play through the story alone against AI opponents"
            hostId={hostId}
            guestId={guestId}
            />      
          {/* </div>
          <div className="flex justify-around my-5"> */}
            <ModeCard 
            name="Arctic Pong" 
            image="/src/Assets/GameArea/arcticarea.jpg"
            desc="Play through the story alone against AI opponents"
            hostId={hostId}
            guestId={guestId}
            />      
            <ModeCard 
            name="Retro Pong" 
            image="/src/Assets/GameArea/RetroPong.jpg"
            desc="Play through the story alone against AI opponents"
            hostId={hostId}
            guestId={guestId}
            />      
          </div>
        </section>
    </div>
    );
}