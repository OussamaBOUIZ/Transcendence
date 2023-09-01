import "../../scss/home.scss";
import ProfileComponent from "./ProfileComponent";
import React, { useState , useEffect} from "react";
import { useParams } from "react-router";
import {User} from "../../../../global/Interfaces"
import {getUserData} from "../../Hooks/getUserData"

export default function Profile() {

  const {username} = useParams();
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getUserData(String(username), "username")
        setUser(userData)
      }
      catch (error) {
        // console.log(error)
      }
    }
    void getData();
  }, [username])

  if (!user.firstname) {
    return (
      <div className="Home">
      </div>
    );
  }

  return (
    <div className="Home">
      <ProfileComponent UserData={user} />
    </div>
  );
}