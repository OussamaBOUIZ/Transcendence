import React, { useState, useEffect } from "react";
import { channelData } from "../../../../global/Interfaces";
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
    image?: string;
    stat: {wins: number, losses: number}
}

export default function ChannelProperty({ channel, propertyName, isUnderMyGrade }: ChannelProps) {
  const [Components, setComponents] = useState();

  useEffect(() => {
    const getInfo = async () => {
      let data: channelProperty[] | undefined = channel?.channelUsers;
      if (propertyName === 'owner')
        data = channel?.channelOwners
      if(propertyName === 'admin') {
        data = channel?.channelAdmins
      }
      try {
        const ComponentsList = await Promise.all(
          data.map(async (element: channelProperty) => {
            const img = await getUserImage(element.id);
            return (
              <UserInfoCard
                key={element.id}
                id={element.id}
                channelId={channel?.id}
                image={img}
                firstname={element.firstname}
                lastname={element.lastname}
                wins={element.stat.wins}
                losses={element.stat.losses}
                flex="col"
                isUnderMyGrade={isUnderMyGrade}
              />
            );
          })
        );
        setComponents(ComponentsList);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    void getInfo();
  });

  return <>{Components}</>;
}