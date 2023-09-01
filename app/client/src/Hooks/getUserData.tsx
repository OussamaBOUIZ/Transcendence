import axios from "axios";
import { getUserImage } from "./getUserImage";
import {PlayerData} from "../../../global/Interfaces"

export const getUserData = async (user: number | string, type: "username" | "id"): Promise<PlayerData> => {

  const path = type === 'username' ? `/api/user/user/profile/${user}` : `/api/user/user/details/${user}`
  try {
    const response = await axios.get<PlayerData>(path);
    const image = await getUserImage(response.data.id)
    return {...response.data, image};
  } catch (error) {
    console.log(error)
    return ({} as PlayerData);
  }
};