import {useState, useContext, useEffect} from "react"
import axios from "axios"
import UserContext from "../Context/UserContext"
import {rooms} from "../../../global/Interfaces"
import { SocketContext } from "../Pages/Chat/ChatRooms"

export function useFetchJoinedRooms() {
    const {user} = useContext(UserContext)
    const {update} = useContext(SocketContext)
    const [publicRooms, setPublicRooms] = useState<rooms[]>([]);
    const [protectedRooms, setProtectedRooms] = useState<rooms[]>([]);
    const [privateRooms, setPrivateRooms] = useState<rooms[]>([]);


    useEffect(() => {
        const getData = async () => {
            try {
                if (user) {
                    const res = await axios.get(`/api/channel/AllChannels/${user?.id}`);
                    const roomData = res.data as rooms[];
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
    }, [user, update])

    return {publicRooms, protectedRooms, privateRooms};
}