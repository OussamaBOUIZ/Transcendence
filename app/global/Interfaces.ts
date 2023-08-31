export interface User {
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
    stat: SStat;
}


export interface InboxItem {
    id?: number;
    user: {id:number, username:string};
    lastMessage: string;
    userName?: string;
    unseenMessages?: number;
    CreatedAt: Date;
}


/**
 * 
 *     {user: {id: recMsg?.authorId, username: recMsg?.username}, 
        lastMessage: recMsg?.message,
        unseenMessages: 1,
        CreatedAt: recMsg.creationTime
    }
 */

export type { FriendUser, Achievement, Leaders, Data};
