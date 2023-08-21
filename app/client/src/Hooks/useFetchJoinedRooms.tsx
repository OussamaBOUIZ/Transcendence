import {useState, useContext, useRef, useEffect} from "react"
import axios from "axios"
import UserContext from "../Context/UserContext"
import {rooms} from "../../../global/Interfaces"

export function useFetchJoinedRooms() {
    const {user} = useContext(UserContext)
    const initialValue = useRef<boolean>(false)
    const [publicRooms, setPublicRooms] = useState<rooms[]>([]);
    const [protectedRooms, setProtectedRooms] = useState<rooms[]>([]);
    const [privateRooms, setPrivateRooms] = useState<rooms[]>([]);
    

    useEffect(() => {
        const getData = async () => {
            try {
                if (user) {
                    const res = await axios.get(`api/channel/AllChannels/${user?.id}`);
                    const roomData = res.data as rooms[];
                    console.log("rooms here")
                    setPublicRooms(roomData.filter((room) => room.channel_type === 'public'));
                    setProtectedRooms(roomData.filter((room) => room.channel_type === 'protected'));
                    setPrivateRooms(roomData.filter((room) => room.channel_type === 'private'));
                }
            }
            catch (err) {
                // console.log(err)
            }
        }
        void getData()
    }, [user])

    return {publicRooms, protectedRooms, privateRooms};
}