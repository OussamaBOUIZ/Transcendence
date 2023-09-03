import "../../scss/home.scss";
import ProfileComponent from "./ProfileComponent";
import React, { useState , useContext} from "react";
import { useParams } from "react-router";
import {PlayerData} from "../../../../global/Interfaces"
import {getUserData} from "../../Hooks/getUserData"
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate";
import UserContext from "../../Context/UserContext";

export default function Profile() {

  const {username} = useParams();
  const {user} = useContext(UserContext)
  const [userData, setUser] = useState<PlayerData>({} as PlayerData)

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
      <div className="Home">
      </div>
    );
  }

  return (
    <div className="Home">
      <ProfileComponent UserData={userData} />
    </div>
  );
}