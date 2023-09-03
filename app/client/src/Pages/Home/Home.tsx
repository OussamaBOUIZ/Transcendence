import React, {useContext} from "react";
import "../../scss/home.scss";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { useFetchLeaders } from "../../Hooks/useFetchLeaders"
import UserContext  from "../../Context/UserContext";

export default function Home() {

    const {user} = useContext(UserContext);

    const leaders = useFetchLeaders();

    if (!user && !leaders)
      return null;

  return (
    <>
      <div className="flex h-full w-full">
        <HomeComponent UserData={user} Leaders={leaders} />
      </div>
      <UserOverview UserData={user} />
    </>
  );
}