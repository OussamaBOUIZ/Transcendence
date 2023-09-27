import React, {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Loading from '../Pages/Loading'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate'

export default function AuthRequired () {

    const {authenticated, isLoading, isAnimationFinished, setIsAnimationFinished, setNotif, setInvitation} = useContext(UserContext)

    if (isLoading)
        return <Loading />
    if (!authenticated)
        return <Navigate to="/home"/>
    return (
        <>
            <Outlet />
        </>
    )
}