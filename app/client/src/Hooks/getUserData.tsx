import axios from "axios";
import { getUserImage } from "./getUserImage";
import {PlayerData} from "../../../global/Interfaces"

export const getUserData = async (id: number): Promise<PlayerData> => {
  try {
    const response = await axios.get(`/api/user/user/details/${id}`);
    const image = await getUserImage(response.data.id)
    return {...response.data, image};
  } catch (error) {
    console.log(error)
    return {};
  }
};