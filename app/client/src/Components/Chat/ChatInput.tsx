import React from 'react'

export default function ChatInput () {
    return (<form className="chat_input">
        <input type="text" placeholder='Type something'/>
        <input type="submit" value="Send" />
    </form>);
}