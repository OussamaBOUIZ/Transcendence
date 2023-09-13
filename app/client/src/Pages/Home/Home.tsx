import React, {useContext} from "react";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { useFetchLeaders } from "../../Hooks/useFetchLeaders"
import UserContext  from "../../Context/UserContext";
import Loading from "../Loading";

export default function Home() {

    const {user} = useContext(UserContext);
    const leaders = useFetchLeaders();

    if (!user && !leaders)
      return (<Loading />)

  return (
      <div className="flex h-full w-full">
        <HomeComponent UserData={user} Leaders={leaders} />
        <UserOverview UserData={user} />
      </div>
  );
}