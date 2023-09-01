import React from 'react'
import {Data} from "../../../../global/Interfaces"

interface typeProps {
  fullName: Data;
  handleChange: (event: {target: {name: string; value: string};}) => void;
  handleSubmit: () => void
}

export default function fullName({fullName, handleChange, handleSubmit} : typeProps) {

  const handleEnter:React.KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <>
        <p className="text-3xl lg:text-5xl md:text-4xl">Enter Full Name</p>
        <div className="inputs flex-col sm:flex-row">
            <input
              autoFocus
              placeholder="First Name"
              type="text"
              name="firstname"
              onKeyDown={handleEnter}
              value={fullName.firstname}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              onKeyDown={handleEnter}
              value={fullName.lastname}
              onChange={handleChange}
            />
        </div>
    </>
  );
}