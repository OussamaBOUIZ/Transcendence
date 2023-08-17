import React, {useContext, useEffect} from "react";
import "../../scss/home.scss";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { getUserData } from "../../Hooks/getUserData";
import { getLeaders } from "../../Hooks/getLeaders"
import UserContext  from "../../Context/UserContext";
import { User } from "../../../../global/Interfaces";

export default function Home() {

    const {user} = useContext(UserContext);

    const leaders = getLeaders();

    if (!user && !leaders)
      return null;

  return (
    <div className="Home">
      <HomeComponent UserData={user} Leaders={leaders} />
      <UserOverview UserData={user} />
    </div>
  );
}