import { InboxItem, MessageData } from "../../../global/Interfaces";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, lastMsg:MessageData, id:number, image:string, username:string) => {
        setter((prevInbox) => {
                    if ( prevInbox.find((inbx) => inbx.author?.id === id) !== undefined) {
                    return prevInbox.map((item) => {
                        return (
                            item.author.id ===  id ?
                            {...item, lastMessage : lastMsg.message,
                             CreatedAt: lastMsg.creationTime
                            }:
                            item
                            )
                        })
                } else {
                    console.log('empty inbox')
                    return  [...prevInbox, {
                        author: {id: id, username: username},
                        lastMessage: lastMsg.message,
                        CreatedAt: lastMsg.creationTime,
                        image: image
                    } as InboxItem];
                }
            //reordering the inbox;
            })
    }


const handleReceivedMsg = (recMsg: MessageData, 
                        setMsgs:React.Dispatch<SetStateAction<MessageData[]>>, 
                        setInL:React.Dispatch<SetStateAction<InboxItem[]>>,
                        id:number) => {
    console.log("recMsg.authorId", recMsg.authorId)
    console.log("id : ", id)
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