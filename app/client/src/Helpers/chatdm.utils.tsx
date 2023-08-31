import { InboxItem, MessageData } from "../../../global/Interfaces";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, messages:MessageData[], id:number) => {
        setter((prevInbox) => {
            console.log(messages)
                    if (prevInbox.find((inbx) => inbx?.user.id === id) !== undefined) {
                    return prevInbox.map((item) => {
                        return (
                            item.user.id ===  id ?
                            {...item, lastMessage : messages[messages?.length - 1].message,
                             CreatedAt: messages[messages?.length - 1].creationTime
                            }:
                            item
                            )
                        })
                } else {
                    return  [...prevInbox, {
                        user: {id: id, username: messages[messages?.length - 1]?.username},
                        lastMessage: messages[messages?.length - 1]?.message,
                        CreatedAt: messages[messages?.length - 1]?.creationTime,
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
        console.log('recMsg : ', recMsg)
        setInL((prevInbox:InboxItem[]) => {
            if (prevInbox.find((inbx) => inbx.user.id === recMsg?.authorId) === undefined) {
                return [...prevInbox, 
                        {user: {id: recMsg.authorId, username: recMsg.username}, 
                            lastMessage: recMsg.message,
                            unseenMessages: 1,
                            CreatedAt: recMsg.creationTime
                        } as InboxItem
                    ]
            } else {
                return prevInbox.map((inbx) => {
                    return inbx.user.id === recMsg?.authorId
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