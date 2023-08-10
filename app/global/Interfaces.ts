interface User {
    id: number,
    firstname: string,
    // image?: string,
    lastname: string,
    username: string,
}

interface MessageData {
    userId: number,
    message: string,
    creationTime: Date
}

export type {User, MessageData};