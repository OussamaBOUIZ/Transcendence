import React from 'react'
interface typeProps {
  username: string;
  handleChange: (event: {target: {name: string; value: string};}) => void;
  handleSubmit: () => void
}

export default function userName({username, handleChange, handleSubmit} : typeProps) {

  const handleEnter:React.KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <>
        <p className="text-3xl lg:text-5xl md:text-4xl">Enter User Name</p>
        <div className="inputs">
            <input
              autoFocus
              placeholder="User Name"
              type="text"
              name="username"
              onKeyDown={handleEnter}
              value={username}
              onChange={handleChange}
            />
        </div>
    </>
  );
}