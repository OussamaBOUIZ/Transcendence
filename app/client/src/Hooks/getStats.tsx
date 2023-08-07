import {useState, useEffect} from "react";
import axios from 'axios';

interface UserData {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    // Add other properties of the UserData object here if needed
}

export const getStats = ({ UserData }: { UserData: UserData | null}) => {
    const [stats, setStats] = useState<any[]>([]);
    
    useEffect(() => {
        const getInfo = async () => {
          try {
            const response = await axios.get(`/api/user/stats/${UserData?.id}`);
            setStats(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getInfo();
      }, []);

    return { stats }
}