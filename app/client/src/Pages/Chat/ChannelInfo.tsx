import React, {useState, useContext, useEffect} from "react";
import axios from "axios"
import {channelData} from "../../../../global/Interfaces"
import ChannelProperty from "./channelProperty";
import UserContext from "../../Context/UserContext";
import { SocketContext } from "./ChatRooms";

export default function ChannelInfo() {
    const [channel, setChannelData] = useState<channelData>()
    const {user} = useContext(UserContext)
    const {id, showSearch, myGrade, update} = useContext(SocketContext)

    useEffect(() => {
        const getChannelData = async () => {
            try {
                const res = await axios.get(`/api/channel/channelData/${id}`)
                setChannelData(res.data)
            }
            catch (e) {
                // console.log(e)
            }
        }
        void getChannelData()
    }, [update, id, showSearch])

    return (
        <div className="info overflow-x-hidden overflow-y-auto">
            <div className="mt-5 flex flex-col gap-4 items-center">
                <label className="text- text-xl font-semibold ml-4 mr-auto">Channel Owners</label>
                <ChannelProperty channel={channel} propertyName="owner" isUnderMyGrade={false}/>
            </div>
            <div className="mt-5 flex flex-col gap-4 items-center">
                <label className="text- text-xl font-semibold ml-4 mr-auto">Admins</label>
                <ChannelProperty channel={channel} propertyName="admin" isUnderMyGrade={(myGrade === "owner") ? true : false}/>
            </div>
            <div className="mt-5 flex flex-col gap-4 items-center">
                <label className="text- text-xl font-semibold ml-4 mr-auto">Members</label>
                <ChannelProperty channel={channel} propertyName="user" isUnderMyGrade={(myGrade !== "user") ? true : false}/>
            </div>
        </div>
        // <ChatOverview />
    )
}