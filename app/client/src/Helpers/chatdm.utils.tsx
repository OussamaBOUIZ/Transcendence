import { InboxItem, MessageData } from "../../../global/Interfaces";
import { shortenMessage } from "./utils";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, messages:MessageData[], id:number) => {
        setter((prevInbox) => {
                console.log('hereeee')
                    if (prevInbox.find((inbx) => inbx?.user.id === Number(id)) === undefined) {
                        console.log("new friend")
                    console.log('entered here')
                    return prevInbox?.map((item) => {
                        return (
                            item.user.id ===  Number(id) ?
                            {...item, lastMessage : shortenMessage(messages[messages?.length - 1]?.message)}:
                            item
)
                        })
                } else {
                    return  [{
                        user: {id: Number(id), username: 'user ' + id},
                        lastMessage: shortenMessage(messages[messages?.length - 1]?.message),
                    }];
                }
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
                            unseenMessage: 1
                        } as InboxItem
                    ]
            } else {
                return prevInbox.map((inbx) => {
                    return inbx.user.id === recMsg?.authorId
                    ? {...inbx, lastMessage:shortenMessage(recMsg?.message), 
                        unseenMessage: inbx?.unseenMessage ?  inbx.unseenMessage + 1 : 1}
                    : inbx
                })
            }
            
        })
    }
}


const resetUnseenMsgCounter = (prevInbox: InboxItem[], id:number) => {
    return prevInbox?.map((inbx) => inbx.id === id ? {...inbx, unseenMessage: 0}: inbx)
}

export {updateInbox, handleReceivedMsg, resetUnseenMsgCounter};