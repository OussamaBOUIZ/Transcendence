import React, { useState, useEffect } from "react";
import { channelData } from "../../../global/Interfaces";
import { getUserImage } from "../../Hooks/getUserImage";
import UserInfoCard from "../../Components/UserInfoCard";

interface ChannelProps {
  channel: channelData | undefined,
  propertyName: string,
  isUnderMyGrade: boolean
}

interface channelProperty {
    id: number;
    channelId?: number,
    firstname: string;
    lastname: string;
    username: string;
    image?: string;
    stat: {wins: number, losses: number}
}

export default function ChannelProperty({ channel, propertyName, isUnderMyGrade }: ChannelProps) {
  const [Components, setComponents] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      let data: channelProperty[] | undefined = []
      if (channel) {
        if (propertyName === "owner") data = channel.channelOwners;
        if (propertyName === "admin") data = channel.channelAdmins;
        if (propertyName === "user") data = channel.channelUsers;
      }
      try {
        const ComponentsList = await Promise.all(
          data.map(async (element: channelProperty) => {
            element.image = await getUserImage(element.id);
            return (
              <UserInfoCard
                key={element.id}
                id={element.id}
                channelId={channel?.id}
                image={element.image}
                firstname={element.firstname}
                lastname={element.lastname}
                username={element.username}
                wins={element.stat.wins}
                losses={element.stat.losses}
                flex="col"
                isUnderMyGrade={isUnderMyGrade}
              />
            );
          })
        );
        setComponents(ComponentsList);
      } catch (error) {}
    };
    void getInfo();
  }, [channel, propertyName, isUnderMyGrade]);

  return <>{Components}</>;
}