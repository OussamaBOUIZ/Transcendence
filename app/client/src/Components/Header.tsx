import React from 'react'
import "../scss/header.scss"
import logo2 from "../Assets/Icons/logo2.png" 

export default function Header () {
    return (
        <div className="header">
            <img className='h-24' src={logo2} alt="logo" />
        </div>
    );
}