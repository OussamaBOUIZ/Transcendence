import React, {useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import UserContext from '../Context/UserContext'
import Loading from '../Pages/Loading'
import useEffectOnUpdate from '../Hooks/useEffectOnUpdate'
import Notification from '../Components/Notification'

export default function AuthRequired () {

    const {authenticated, isLoading, isAnimationFinished, setIsAnimationFinished, notif, setNotif, invitation, setInvitation} = useContext(UserContext)
    useEffectOnUpdate(() => {setNotif(""); setInvitation(undefined); setIsAnimationFinished(false)}, [isAnimationFinished])
    
    if (isLoading)
        return <Loading />
    if (!authenticated)
        return <Navigate to="/home" />
    return (
        <>
            {(notif || invitation?.username) && <Notification message={notif} playNow={invitation} />}
            <Outlet />
        </>
    )
}