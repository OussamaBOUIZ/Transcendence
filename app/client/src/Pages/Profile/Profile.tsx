import UserContext from "../../Context/UserContext";
import { getUserData } from "../../Hooks/getUserData";
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate";
import "../../scss/home.scss";
import ProfileComponent from "./ProfileComponent";
import React, { useContext } from "react";
import { useParams } from "react-router";

export default function Profile() {

  const {name} = useParams();
  const {user} = useContext(UserContext)

  if (!name && !user) {
    return (
      <div className="Home">
      </div>
    );
  }

  // useEffectOnUpdate(() => {
  //   const getData = async () => {
  //     try {
  //       const userData = await getUserData(name, 'name')
  //       console.log(userData)
  //     }
  //     catch (error) {
  //       // console.log(error)
  //     }
  //   }
  //   void getData();
  // }, [name])
  
  return (
    <div className="Home">
      <ProfileComponent UserData={user} />
    </div>
  );
}