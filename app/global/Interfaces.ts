export interface User {
    id: number,
    firstname: string,
    image?: string,
    lastname: string,
    username?: string,
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
    losses: number,
    wins: number,
    achievements?: Achievement[],
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
    username?:string,
    message: string,
    creationTime: string,
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

export interface StatAchievement {
    id: number;
    badge_name: string;
    description: string;
    image?: string;
  }
  
export interface SStat {
    achievements: StatAchievement[];
    ladder_level: number;
    losses: number;
    wins: number;
  }
  
  export interface PlayerData {
    id: number;
    firstname: string;
    lastname: string;
    username?:string;
    image?:string;
    stat: SStat;
}

export interface InboxItem {
    id?: number;
    author: {id:number, username:string};
    lastMessage: string;
    userName?: string;
    unseenMessages?: number;
    CreatedAt: string;
    online: boolean;
    image?: string;
}

export type {Message, roomData, FriendUser, Achievement, Leaders, Data, userInfoCard, channelData, rooms};
