import React, {useState, useContext, useEffect} from "react";
import axios from "axios"
import {channelData, User} from "../../../../global/Interfaces"
import ChannelProperty from "./channelProperty";
import {UpdateContext} from "./ChatOverview"

export default function ChannelInfo({user}: {user: User | null}) {
    const {update} = useContext(UpdateContext)


    console.log("ChannelInf")

    const [channel, setData] = useState<channelData>()

    useEffect(() => {
        const getChannelData = async () => {
            try {
                const res = await axios.get(`/api/channel/channelData/9`)
                console.log(res.data)
                setData(res.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getChannelData()
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
                console.log(err)
            }
        }
        getInfo()
    }, [user, channel])


    return (
        <div className="info overflow-x-hidden overflow-y-auto ">
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Channel Owners</label>
                <ChannelProperty channel={channel} propertyName="owner" isUnderMyGrade={false}/>
            </div>
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Admins</label>
                <ChannelProperty channel={channel} propertyName="admin" isUnderMyGrade={(myGrade === "owner") ? true : false}/>
            </div>
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Members</label>
                <ChannelProperty channel={channel} propertyName="user" isUnderMyGrade={(myGrade === "owner" || myGrade === "admin") ? true : false}/>
            </div>
        </div>
        // <ChatOverview />
    )
}