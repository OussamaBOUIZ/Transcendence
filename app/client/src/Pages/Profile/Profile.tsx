import ProfileComponent from "./ProfileComponent";
import React, { useState , useContext} from "react";
import { useParams } from "react-router";
import {User} from "../../../global/Interfaces"
import {getUserData} from "../../Hooks/getUserData"
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate";
import UserContext from "../../Context/UserContext";

export default function Profile() {

  const {username} = useParams();
  const {user} = useContext(UserContext)
  const [userData, setUser] = useState<User>({} as User)

  useEffectOnUpdate(() => {
    const getData = async () => {
      try {
        const data = await getUserData(String(username), "username")
        setUser(data)
        if (userData.id === user.id) userData.status === 'Online'
      }
      catch (error) {
        // console.log(error)
      }
    }
    void getData();
  }, [userData.status])

  if (!userData.firstname) {
    return (
      <div className="flex w-full h-full ml-4">
      </div>
    );
  }

  return (
    <div className="flex w-full h-full ml-4">
      <ProfileComponent UserData={userData} />
    </div>
  );
}