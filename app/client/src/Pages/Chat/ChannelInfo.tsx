import React, {useState, useEffect} from "react";
import axios from "axios"
import UserInfoCard from "../../Components/UserInfoCard";
import { getUserData } from "../../Hooks/getUserData";
import {channelData} from "../../../../global/Interfaces"
import { getUserImage } from "../../Hooks/getUserImage";

export default function ChannelInfo() {

    const [channel, setData] = useState<channelData>()
    const user = getUserData();


    useEffect(() => {
        const getChannelData = async () => {
            try {
                const res = await axios.get(`/api/channel/channelData/9`)
                setData(res.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getChannelData()
    }, [])


    const [myGrade, setMyGrade] = useState<string>("")
    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get(`/api/channel/userGrade/${user.id}?channelId=9`);
                setMyGrade(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getInfo()
    }, [])


    const channelOwners = channel?.channelOwners.map((element) => {
        const getImage = async () => {
            const img = await getUserImage(element.id)
            element.image = img;
        }
        getImage()
        return (
            <UserInfoCard
                id={element.id}
                image={element.image}
                firstname={element.firstname}
                lastname={element.lastname}
                wins={element.stat.wins}
                losses={element.stat.losses}
                flex="col"
                isUnderMyGrade={false}
            />
        )
    })

    const channelAdmins = channel?.channelAdmins.map((element) => {
        const getImage = async () => {
            const img = await getUserImage(element.id)
            element.image = img;
        }
        getImage()
        return (
            <UserInfoCard
                key={element.id}
                image={element.image}
                firstname={element.firstname}
                lastname={element.lastname}
                wins={element.stat.wins}
                losses={element.stat.losses}
                flex="col"
                isUnderMyGrade={myGrade === "owner" ? true : false}
            />
        )
    })

    const channelMembers = channel?.channelUsers.map((element) => {
        const getImage = async () => {
            const img = await getUserImage(element.id)
            element.image = img;
        }
        getImage()
        return (
            <>
                <UserInfoCard
                    key={element.id}
                    image={element.image}
                    firstname={element.firstname}
                    lastname={element.lastname}
                    wins={element.stat.wins}
                    losses={element.stat.losses}
                    flex="col"
                    isUnderMyGrade={(myGrade === "owner" || myGrade === "admin") ? true : false}
                />
            </>
        )
    })

    return (
        <div className="info overflow-x-hidden overflow-y-auto ">
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Channel Owners</label>
                {channelOwners}
            </div>
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Admins</label>
                {channelAdmins}
            </div>
            <div className="mt- mt-5 flex flex-col gap-4">
                <label className="text- text-xl font-semibold ml-4">Members</label>
                {channelMembers}
            </div>
        </div>
        // <ChatOverview />
    )
}