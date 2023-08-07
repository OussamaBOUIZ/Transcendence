import React from 'react'
import {Outlet} from 'react-router-dom'
// import axios from 'axios'

export default function AuthRequired () {
    // const authenticated =  await axios.get('/api/auth/tokenValidity');
    const authenticated = true
    console.log(authenticated)
    if (!authenticated)
        return <div className='center'><h1>You have to login</h1></div>
    return <Outlet />
}