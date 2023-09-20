import { InboxItem, MessageData } from "../../global/Interfaces";
import { SetStateAction } from 'react'
import {getUserImage} from "../Hooks/getUserImage"
import {Socket} from "socket.io-client"

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


const updateInboxBySending  = (sendMsg: MessageData, 
    inboxList: React.MutableRefObject<InboxItem[]>,
    avatar:string | undefined, username:string | undefined
    ) => {
        if (inboxList.current.find((inbx) => inbx.author.id === sendMsg.receiverId)) {
            inboxList.current = inboxList.current.map((inbx) => {
                return inbx.author.id === sendMsg.receiverId 
                ? {...inbx, lastMessage: sendMsg.message, CreatedAt: sendMsg.creationTime}
                : inbx
            })
        } else inboxList.current = [...inboxList.current, 
            {author: {id: sendMsg.receiverId, username: username}, 
                image: avatar,
                lastMessage: sendMsg.message,
                CreatedAt: sendMsg.creationTime
            } as InboxItem
        ]
}

const updateInboxByReceiving = async (
    socket: Socket | undefined,
    recMsg: MessageData,
    inboxList: React.MutableRefObject<InboxItem[]>,
    inView: boolean
  ): Promise<InboxItem[]> => {
        if (inboxList.current.find((inbx) => inbx.author.id === recMsg.authorId)) {
            return inboxList.current.map((inbx) => {
                console.log(inbx.author.id, ": ", recMsg.authorId, "IN VIEW: ", inView)
                if (inbx.author.id === recMsg.authorId ) {
                    socket?.emit('updateUnseenMessage', inbx.author.id)
                    return {...inbx,
                        lastMessage: recMsg.message, 
                        CreatedAt: recMsg.creationTime,
                        unseenMessages: inView ? 0 : (inbx.unseenMessages + 1)
                    }
                }
                return inbx;
            })
        } else {
            const getNewInboxElement = async (): Promise<InboxItem[]> => {
                const img = await getUserImage(recMsg.authorId)
                const NewConversation: InboxItem = {
                    author: {id: recMsg.authorId, username: recMsg.username},
                    lastMessage: recMsg.message,
                    CreatedAt: recMsg.creationTime,
                    unseenMessages: inView ? 0 : 1,
                    image: img
                }
                return [...inboxList.current, NewConversation];
            }
            return await getNewInboxElement()
    }
}


const resetUnseenMsgs = (socket: Socket | undefined, inboxList: React.MutableRefObject<InboxItem[]>, setUpdate: React.Dispatch<SetStateAction<number>>, viewId:number) => {
    console.log('resetMessages is called!!!');
    
    inboxList.current = inboxList.current.map((inbx) => {
        if (inbx.author?.id === viewId) {
            socket?.emit('messageSeen', inbx.author.id)
            setUpdate(prev => prev + 1)
            return {...inbx, unseenMessages: 0}
        }
        return inbx
        })
}

const updateInboxAtStart = (inboxList: React.MutableRefObject<InboxItem[]>, lastMsg: MessageData, viewId: number) => {
    inboxList.current = inboxList.current.map((inbx) => {
            return inbx.author.id === viewId 
            ? {...inbx, 
                lastMessage: lastMsg?.message, 
                CreatedAt: lastMsg?.creationTime
            }
            : inbx;
        }
        )
}

export {updateInbox, handleReceivedMsg, updateInboxByReceiving, updateInboxBySending, resetUnseenMsgs, updateInboxAtStart};