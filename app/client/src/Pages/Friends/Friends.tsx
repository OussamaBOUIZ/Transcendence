import FriendsComponent from "./FriendsComponent";
import GlobalLeaderBoard from "../../Components/GlobalLeaderBoard";
import { useFetchLeaders } from "../../Hooks/useFetchLeaders";
import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

export default function Friends() {

  const {user} = useContext(UserContext)
  const leaders = useFetchLeaders();


  if (!user) {
    return (
        <div className="flex w-full h-full ml-4">
          
      </div>
    )
  }
  if (!leaders) {
    return (
      <div className="flex w-full h-full ml-4">
        <FriendsComponent />
      </div>
    )
  }

  return (
    <div className="flex w-full h-full ml-4">
      <FriendsComponent />
      <GlobalLeaderBoard Leaders={leaders}/>
    </div>
  );
}
