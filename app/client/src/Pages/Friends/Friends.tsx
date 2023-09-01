import "../../scss/home.scss";
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
        <div className="Home">
          
      </div>
    )
  }
  if (!leaders) {
    return (
      <div className="Home">
        <FriendsComponent />
      </div>
    )
  }

  return (
    <div className="Home">
      <FriendsComponent />
      <GlobalLeaderBoard Leaders={leaders}/>
    </div>
  );
}
