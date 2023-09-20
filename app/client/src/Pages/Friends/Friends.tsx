import FriendsComponent from "./FriendsComponent";
import GlobalLeaderBoard from "../../Components/GlobalLeaderBoard";
import { useFetchLeaders } from "../../Hooks/useFetchLeaders";
import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loading from "../Loading";

export default function Friends() {

  const {user} = useContext(UserContext)
  const leaders = useFetchLeaders();

  if (!leaders || !user) {
    return (<Loading />)
  }

  return (
    <div className="flex w-full h-full ml-4">
      <FriendsComponent />
      <GlobalLeaderBoard Leaders={leaders}/>
    </div>
  );
}
