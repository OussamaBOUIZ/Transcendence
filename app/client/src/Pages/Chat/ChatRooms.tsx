import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChatRooms () {
    const params = useParams()
    return (
        <h2> Room id: {params.id} </h2>
    );
}