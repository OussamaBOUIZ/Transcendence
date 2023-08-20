import React from 'react'
import { useParams } from 'react-router-dom'
import InboxRooms from './InboxRooms'

export default function ChatRooms () {
    const params = useParams()
    return (
        <>
        <InboxRooms />
        <h2> Room id: {params.id} </h2>
        </>
    );
}