export interface lastGame {
    id: number;
    opponent: number;
    opponent_score: number;
    user_score: number;
}

interface FriendUser {
    firstname: string,
    id: number,
    image?: string,
    lastname: string,
    stat: Stat,
    status: string,
    username: string,
    lastGame: lastGame | string;
}


interface Achievement {
    id: number,
    badge_name: string,
    description: string,
    image?: string,
    is_achieved?: boolean,
    user_id?: number,
}

interface Stat {
    ladder_level: number,
    levelPercentage: number,
    losses: number,
    wins: number,
    achievements: Achievement[],
}

interface Leaders {
    image?: string,
    username: string,
    id: number,
    ladder_level: number,
    losses: number,
    user: User,
    wins: number,
    xp: number | null,
}

export interface MessageData {
    receiverId?: number,
        authorId?:number,
        message: string,
        creationTime: Date,
}

interface Data {
    firstname: string,
    lastname: string,
    username: string,
}
// interface DmUserOverview {
//     id: number,
//     firstname: string,
//     lastname: string,
//     stat: Stat,
// }

interface userInfoCard {
    id: number,
    channelId?: number,
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

interface rooms {
    channel_type: string;
    id: number;
    channel_name: string,
}

interface roomData {
    channelName: string,
    userId: number,
    minutes?: number
}

interface Message {
    id?: number,
    message: string,
    fromUser: number,
    CreatedAt?: Date,
    channelName?: string,
    image?: string,
    username?: string,
    isBlocked: boolean,
}

  
  export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username?: string;
    image?: string;
    stat?: Stat;
    status: string;
}


export type {Message, roomData, FriendUser, Achievement, Leaders, Data, userInfoCard, channelData, rooms};
