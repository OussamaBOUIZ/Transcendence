interface User {
    firstname: string,
    id: number,
    image?: string,
    lastname: string,
    username: string,
}

interface FriendUser {
    firstname: string,
    id: number,
    image?: string,
    lastname: string,
    stat: Stat,
    status: string,
    username: string,
}

interface Stat {
    ladder_level: number,
    losses: number,
    wins: number,
}

interface Achievement {
    badge_name: string,
    description: string,
    id: number,
    image?: string,
    is_achieved: boolean,
    user_id: number,
}

interface Leaders {
    id: number,
    ladder_level: number,
    losses: number,
    user: User,
    wins: number,
    xp: number | null,
}

interface MessageData {
    userId: number,
    message: string,
    creationTime: Date
}

interface Data {
    firstname: string,
    lastname: string,
    username: string,
}

export type {User, MessageData, FriendUser, Achievement, Leaders, Data};