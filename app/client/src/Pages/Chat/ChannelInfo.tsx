import React, {useState, useContext, useEffect} from "react";
import axios, {AxiosResponse} from "axios"
import {channelData} from "../../../global/Interfaces"
import ChannelProperty from "./channelProperty";
import { SocketContext } from "./ChatRooms";
import { useMediaQuery } from "@uidotdev/usehooks";
import { HiOutlineX } from "react-icons/hi";
import UserContext from "../../Context/UserContext";

export default function ChannelInfo() {
    const [channel, setChannelData] = useState<channelData>()
    const {id, showSearch, myGrade, update} = useContext(SocketContext)
    const isSmallDevice = useMediaQuery("only screen and (max-width : 820px)");
    const {setShow} = useContext(UserContext)

    useEffect(() => {
        const getChannelData = async () => {
            try {
                const res: AxiosResponse<channelData> = await axios.get(`/api/channel/channelData/${id}`)
                setChannelData(res.data)
            }
            catch (e) {
                // console.log(e)
            }
        }
        void getChannelData()
    }, [update, id, showSearch])

    return (
        <div className="info overflow-x-hidden overflow-y-auto relative">
            {isSmallDevice && <HiOutlineX className="absolute top-4 right-4 w-6 h-6 cursor-pointer" onClick={() => setShow('main')}/>}
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
    )
}