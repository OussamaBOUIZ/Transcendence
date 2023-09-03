import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

// import Sign from './Pages/Sign/Sign'
// import '../scss/main.scss'

export default function MainLayout () {
    return (
        <div className='h-full'>
            <div className="fixed z-50 w-full top-0 bg-primary-color sm:bg-transparent">
                <Header />
            </div>
            <main>
                <Sidebar />
                <Outlet />
            </main>
        </div>
    );
}