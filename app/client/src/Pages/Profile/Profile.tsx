import ProfileComponent from "./ProfileComponent";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import {User} from "../../../global/Interfaces"
import {getUserData} from "../../Hooks/getUserData"
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate";
import Loading from "../Loading";
import UserContext from "../../Context/UserContext";

export default function Profile() {

  const {navigate} = useContext(UserContext)
  const {username} = useParams();
  const [userData, setUser] = useState<User>({} as User)

  useEffectOnUpdate(() => {
    const getData = async () => {
        const data = await getUserData(String(username), "username")
        if (typeof data === 'string')
          navigate('/error', { state: { statusCode: 404, statusText: "Not Found" } });
        else
          setUser(data)
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