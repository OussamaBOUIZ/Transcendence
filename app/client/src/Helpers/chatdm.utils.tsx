import { InboxItem, MessageData } from "../../../global/Interfaces";
import { shortenMessage } from "./utils";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, messages:MessageData[], id:number) => {
        setter((prevInbox) => {
                    if (prevInbox.find((inbx) => inbx?.user.id === id) !== undefined) {
                    return prevInbox.map((item) => {
                        return (
                            item.user.id ===  id ?
                            {...item, lastMessage : shortenMessage(messages[messages?.length - 1]?.message)}:
                            item
                            )
                        })
                } else {
                    return  [...prevInbox, {
                        user: {id: id, username: messages[messages?.length - 1]?.username},
                        lastMessage: shortenMessage(messages[messages?.length - 1]?.message),
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
                        {user: {id: recMsg?.authorId, username: recMsg?.username}, 
                            lastMessage: shortenMessage(recMsg?.message),
                            unseenMessages: 1
                        } as InboxItem
                    ]
            } else {
                return prevInbox.map((inbx) => {
                    return inbx.user.id === recMsg?.authorId
                    ? {...inbx, lastMessage:shortenMessage(recMsg?.message), 
                        unseenMessages: inbx?.unseenMessages ?  inbx.unseenMessages + 1 : 1}
                    : inbx
                })
            }
            
        })
    }
}

const reorderInbox = (userId:number, setter:React.Dispatch<SetStateAction<InboxItem[]>>) => {
    setter((prevInbox) => {
    const recentElement:InboxItem = prevInbox.find((inbx) => inbx?.user.id === userId)

    return [recentElement, ...prevInbox.filter((item) => item.user.id !== userId)]
    })
}

// const resetUnseenMsgCounter = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, id:number) => {
    
// }

// export {updateInbox, handleReceivedMsg, resetUnseenMsgCounter};
export {updateInbox, handleReceivedMsg, reorderInbox};