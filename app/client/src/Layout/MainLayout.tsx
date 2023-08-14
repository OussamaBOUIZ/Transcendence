import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

// import Sign from './Pages/Sign/Sign'
import '../scss/main.scss'

export default function MainLayout () {
    return (
        <div>
        <Header />
        <main>
        <Sidebar />
        <Outlet />
        </main>
        </div>
    );
}