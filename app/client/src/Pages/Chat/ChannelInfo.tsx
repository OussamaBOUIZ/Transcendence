import React, {useState, useContext, useEffect} from "react";
import axios from "axios"
import {channelData} from "../../../../global/Interfaces"
import ChannelProperty from "./channelProperty";
import {UpdateContext} from "./ChatOverview"
import UserContext from "../../Context/UserContext";

export default function ChannelInfo() {
    const {update} = useContext(UpdateContext)
    const [channel, setData] = useState<channelData>()
    const {user} = useContext(UserContext)

    useEffect(() => {
        const getChannelData = async () => {
            try {
                const res = await axios.get(`/api/channel/channelData/1`)
                setData(res.data)
            }
            catch (e) {
                // console.log(e)
            }
        }
        void getChannelData()
    }, [update])

    const [myGrade, setMyGrade] = useState<string>("")
    useEffect(() => {
        const getInfo = async () => {
            try {
                if (user && channel) {
                    const res = await axios.get(`/api/channel/userGrade/${user?.id}?channelId=${channel?.id}`);
                    setMyGrade(res.data)
                }
            }
            catch (err) {
                // console.log(err)
            }
        }
        void getInfo()
    }, [user, channel])


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
                <ChannelProperty channel={channel} propertyName="user" isUnderMyGrade={(myGrade === "owner" || myGrade === "admin") ? true : false}/>
            </div>
        </div>
        // <ChatOverview />
    )
}