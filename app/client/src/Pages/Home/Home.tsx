import React from "react";
import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { getUserData } from "../../Hooks/getUserData";
import { getLeaders } from "../../Hooks/getLeaders"

export default function Home() {

    const userData = getUserData();
    const leaders = getLeaders();

    if (!userData && !leaders)
      return null;

  return (
    <div className="Home">
      <SideBar />
      <HomeComponent UserData={userData} Leaders={leaders} />
      <UserOverview UserData={userData} />
    </div>
  );
}