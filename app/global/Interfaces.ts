interface User {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
}

interface MessageData {
    userId: number,
    message: string,
    creationTime: Date
}

export type {User, MessageData};