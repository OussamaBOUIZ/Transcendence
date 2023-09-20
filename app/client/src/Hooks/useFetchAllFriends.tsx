import axios from 'axios';
import {useState, useContext} from "react";
import { getUserImage } from "./getUserImage";
import {FriendUser, lastGame} from "../../global/Interfaces"
import UserContext from '../Context/UserContext';
import useEffectOnUpdate from './useEffectOnUpdate';

export const useFetchAllFriends = (id: number, update?: number, setIsMyFriend?: React.Dispatch<React.SetStateAction<boolean>>): FriendUser[] | [] => {

  const {user} = useContext(UserContext)
  const [allFriends, setAllFriends] = useState<FriendUser[]>([]);

    const getData = async (id: number): Promise<FriendUser[] | []> => {
        try {
          if (id) {
            const res = await axios.get(`/api/user/allfriends/${id}`);
            return res.data.friends;
          }
        } catch (err) {
            console.log("Error: Failed to fetch all friends.");
            console.log(err);
          }
        return [];
    };

    useEffectOnUpdate(() => {
        const fetchFriends = async () => {
          const friends = await getData(id);
          const friendswithImage = await Promise.all(
            friends.map(async (friend) => { 
              let lastGame: lastGame | string = {} as lastGame
              if (setIsMyFriend && friend.id === user.id)
                setIsMyFriend(true)
              else {
                const res = await axios.get<lastGame | string>(`/api/user/friendLastGame/${friend.id}?userId=${user.id}`)
                lastGame = res.data;
                console.log(res.data);
                
              }
              const image = await getUserImage(friend.id);
              return { ...friend, lastGame, image };
            })
          );
    
          setAllFriends(friendswithImage);
        };
    
      void fetchFriends();
      }, [id, update, user]);
    
    return allFriends
}