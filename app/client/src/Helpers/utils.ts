import React, { SetStateAction, useEffect, useRef } from "react";
const MAX_LENGTH:number = 13

function shortenMessage(mess:string) :string {
    if (mess?.length < MAX_LENGTH)
        return mess;
    return (mess?.slice(0, 9) + "...")
}

function capitalize(inputString?: string) {
  if (inputString && inputString.length)
    return inputString[0].toUpperCase() + inputString.slice(1);
  return inputString;
}
  
  function handleClickOutside(setPopupOpen: React.Dispatch<SetStateAction<boolean>>) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const count = useRef<number>(0);
    
    useEffect(() => {
      function handleClick(event: MouseEvent) {
        if (count.current && wrapperRef.current && !wrapperRef.current.contains(event.target as Node))
          setPopupOpen(false)
        count.current += 1;
      }
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [wrapperRef]);

    return wrapperRef;
  }
  
export {shortenMessage, capitalize, handleClickOutside}