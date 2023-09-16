import ProfileComponent from "./ProfileComponent";
import React, { useState } from "react";
import { useParams } from "react-router";
import {User} from "../../../global/Interfaces"
import {getUserData} from "../../Hooks/getUserData"
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate";
import Loading from "../Loading";

export default function Profile() {

  const {username} = useParams();
  const [userData, setUser] = useState<User>({} as User)

  useEffectOnUpdate(() => {
    const getData = async () => {
      try {
        const data = await getUserData(String(username), "username")
        setUser(data)
      }
      catch (error) {
        // console.log(error)
      }
    }
    void getData();
  }, [userData.status])

  if (!userData.firstname)
    return (<Loading />)

  return (
    <div className="flex w-full h-full ml-4">
      <ProfileComponent UserData={userData} />
    </div>
  );
}