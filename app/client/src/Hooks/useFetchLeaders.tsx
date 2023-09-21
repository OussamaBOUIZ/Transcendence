import {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {Leaders} from "../../global/Interfaces"
import { getUserImage } from "./getUserImage";
import UserContext from "../Context/UserContext";

export const useFetchLeaders = (): Leaders[] | [] => {
  const {navigate} = useContext(UserContext)
  const [leaders, setLeaders] = useState<Leaders[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get<Leaders[] | []>("/api/user/leaders");
        const leadersWithImages = await Promise.all(
          response.data.map(async (leader) => {
            const image = await getUserImage(leader.id);
            return { ...leader, image };
          })
        );
        setLeaders(leadersWithImages);
      }
      catch (err: any) {}
    };
  void getInfo();
  }, []);

  return leaders;
}