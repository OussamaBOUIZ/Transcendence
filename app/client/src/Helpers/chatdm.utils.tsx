import { InboxItem, MessageData } from "../../../global/Interfaces";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, messages:MessageData[], id:number) => {
        setter((prevInbox) => {
            console.log(messages)
                    if (prevInbox.find((inbx) => inbx.author?.id === id) !== undefined) {
                    return prevInbox.map((item) => {
                        return (
                            item.author.id ===  id ?
                            {...item, lastMessage : messages[messages.length - 1]?.message,
                             CreatedAt: messages[messages.length - 1]?.creationTime
                            }:
                            item
                            )
                        })
                } else {
                    return  [...prevInbox, {
                        author: {id: id, username: messages[messages.length - 1]?.username},
                        lastMessage: messages[messages.length - 1]?.message,
                        CreatedAt: messages[messages.length - 1]?.creationTime,
                    } as InboxItem];
                }
            //reordering the inbox;
            })
    }


const handleReceivedMsg = (recMsg: MessageData, 
                        setMsgs:React.Dispatch<SetStateAction<MessageData[]>>, 
                        setInL:React.Dispatch<SetStateAction<InboxItem[]>>,
                        id:number) => {
    if (recMsg?.authorId === id)
        setMsgs((prevList:MessageData[]) => [...prevList, recMsg])
    else {
        setInL((prevInbox:InboxItem[]) => {
            if (prevInbox.find((inbx) => inbx.author.id === recMsg?.authorId) === undefined) {
                return [...prevInbox, 
                        {author: {id: recMsg.authorId, username: recMsg.username}, 
                            lastMessage: recMsg.message,
                            unseenMessages: 1,
                            CreatedAt: recMsg.creationTime
                        } as InboxItem
                    ]
            } else {
                return prevInbox.map((inbx) => {
                    return inbx.author.id === recMsg?.authorId
                    ? {...inbx, lastMessage:recMsg?.message,
                        unseenMessages: inbx?.unseenMessages ?  inbx.unseenMessages + 1 : 1,
                        CreatedAt: recMsg.creationTime
                    }
                    : inbx
                })
            }
            
        })
    }
}

export {updateInbox, handleReceivedMsg};