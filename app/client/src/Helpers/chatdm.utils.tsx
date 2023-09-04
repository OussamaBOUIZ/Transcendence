import { InboxItem, MessageData } from "../../../global/Interfaces";
import { SetStateAction } from 'react'

const updateInbox = (setter:React.Dispatch<SetStateAction<InboxItem[]>>, lastMsg:MessageData, id:number, image:string, username:string) => {
        console.log('updateinbox called');
        
        console.log("Viewid", id)
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
            if (prevInbox.find((inbx) => inbx.author.id === id) === undefined) {
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


const updateInboxBySending  = (sendMsg: MessageData, setInboxList:React.Dispatch<SetStateAction<InboxItem[]>>) => {
    setInboxList((prevList) => {
        if (prevList.find((inbx) => inbx.author.id === sendMsg.receiverId)) {
            return prevList.map((inbx) => {
                return inbx.author.id === sendMsg.receiverId 
                ? {...inbx, lastMessage: sendMsg.message, CreatedAt: sendMsg.creationTime}
                : inbx
            })
        } else return [...prevList, 
            {author: {id: sendMsg.receiverId, username: sendMsg.username}, 
                lastMessage: sendMsg.message,
                CreatedAt: sendMsg.creationTime
            } as InboxItem
        ]
    })    
}

const updateInboxByReceiving = (recMsg: MessageData, setInboxList:React.Dispatch<SetStateAction<InboxItem[]>>, inView:boolean) => {
    console.log('updateInboxByReceiving');
    console.log("inView : ", inView)
    setInboxList((prevList) => {
        if (prevList.find((inbx) => inbx.author.id === recMsg.authorId)) {
            return prevList.map((inbx) => {
                console.log("inbx.unseenMessages", inbx.unseenMessages)
                return inbx.author.id === recMsg.authorId 
                ? {...inbx, 
                    lastMessage: recMsg.message, 
                    CreatedAt: recMsg.creationTime,
                    unseenMessages: inView ? 0 : (inbx.unseenMessages + 1)
                }
                : inbx
            })
        } else return [...prevList,
            {author: {id: recMsg.receiverId, username: recMsg.username}, 
                lastMessage: recMsg.message,
                CreatedAt: recMsg.creationTime,
                unseenMessages: inView ? 0 : 1
            } as InboxItem
        ]
    })
}

const resetUnseenMsgs = (setInboxList:React.Dispatch<SetStateAction<InboxItem[]>>, viewId:number) => {
    console.log('resetMessages is called!!!');
    
    setInboxList((prevInbox:InboxItem[]) => {
    return prevInbox.map((inbx) => {
        return inbx.author?.id === viewId ? {...inbx, unseenMessages: 0}: inbx
        })
    })
}

const updateInboxAtStart = (setInboxList:React.Dispatch<SetStateAction<InboxItem[]>>, lastMsg: MessageData, viewId: number) => {
    setInboxList((prevList) => {
        return prevList.map((inbx) => {
            return inbx.author.id === viewId 
            ? {...inbx, 
                lastMessage: lastMsg?.message, 
                CreatedAt: lastMsg?.creationTime
            }
            : inbx;
        }
        )})
}

export {updateInbox, handleReceivedMsg, updateInboxByReceiving, updateInboxBySending, resetUnseenMsgs, updateInboxAtStart};