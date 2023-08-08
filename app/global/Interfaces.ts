interface User {
    firstname: string,
    id: number,
    lastname: string,
    userName: string,
}

interface MessageData {
    userId: number,
    message: string,
    creationTime: Date
}

export type {User, MessageData};