import {useContext, useState, useEffect} from "react"
import axios, {AxiosResponse} from "axios"
import UserContext from "../Context/UserContext"
import {rooms} from "../../global/Interfaces"
import { SocketContext } from "../Pages/Chat/ChatRooms"

export function useFetchJoinedRooms() {
    const {user,navigate} = useContext(UserContext)
    const {update} = useContext(SocketContext)
    const [publicRooms, setPublicRooms] = useState<rooms[]>([]);
    const [protectedRooms, setProtectedRooms] = useState<rooms[]>([]);
    const [privateRooms, setPrivateRooms] = useState<rooms[]>([]);

    useEffect(() => {
        try {
            if (user.id) {
                setTimeout( () => {
                    const getInfo = async () => {
                        const res: AxiosResponse<rooms[]> = await axios.get(`/api/channel/AllChannels/${user.id}`);
                        setPublicRooms(res.data.filter((room) => room.channel_type === 'public'));
                        setProtectedRooms(res.data.filter((room) => room.channel_type === 'protected'));
                        setPrivateRooms(res.data.filter((room) => room.channel_type === 'private'));
                    }
                    void getInfo();
                }, 500)
            }
        }
        catch (err: any) {
            navigate('/error', { state: { statusCode: err.response.status, statusText: err.response.statusText } });
        }
    }, [user.id, update])

    return {publicRooms, protectedRooms, privateRooms};
}