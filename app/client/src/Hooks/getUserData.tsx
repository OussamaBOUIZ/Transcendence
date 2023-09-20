import axios from "axios";
import { getUserImage } from "./getUserImage";
import {User} from "../../global/Interfaces"

export const getUserData = async (user: number | string, type: "username" | "id"): Promise<User> => {

  const path = type === 'username' ? `/api/user/user/profile/${user}` : `/api/user/user/details/${user}`
  try {
    const response = await axios.get<User>(path);
    const image = await getUserImage(response.data.id)
    return {...response.data, image};
  } catch (error) {
    console.log(error)
    return ({} as User);
  }
};