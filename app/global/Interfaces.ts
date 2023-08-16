interface User {
    id: number,
    firstname: string,
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
    image?: string,
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

interface userInfoCard {
    id: number,
    image: string | undefined,
    status?: string,
    firstname: string,
    lastname: string,
    username?: string,
    wins: number,
    losses: number,
    flex: string,
    isUnderMyGrade: boolean
}

interface channelData {
    id: number,
    channelOwners: {id: number, firstname: string, lastname: string, image?: string, stat: {wins: number, losses: number}}[],
    channelAdmins: {id: number, firstname: string, lastname: string, image?: string, stat: {wins: number, losses: number}}[],
    channelUsers: {id: number, firstname: string, lastname: string, image?: string, stat: {wins: number, losses: number}}[]
}

export type {User, MessageData, FriendUser, Achievement, Leaders, Data, userInfoCard, channelData};
