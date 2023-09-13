import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../Context/UserContext';

interface PropType {
    name:string;
    image:string;
    desc:string;
    hostId:number;
    guestId:number;
  }
  
  export default function ModeCard({name, image, desc, hostId, guestId}: PropType) {
    
    const [descStyle, setDescStyle] = useState({visibility: "hidden"});
    const [shadowStyle, setShadowStyle] = useState({});
    const {socket} = useContext(UserContext)

    function handleInv() {
      socket?.emit('receiveInvitation', {userId: hostId, guestId: guestId})
  }
  
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
      // <Link to={`/game/${name.split(' ').join('').toLowerCase()}/${hostId}${guestId}`}
      // >
      <div className="cursor-pointer" onClick={handleInv}>

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
      </div>
      // </Link>
    )
  }