import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import FriendsComponent from "./FriendsComponent";
import GlobalLeaderBoard from "../../Components/GlobalLeaderBoard";
import { getLeaders } from "../../Hooks/getLeaders";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

export default function Friends() {

  const {user} = useContext(UserContext)
  const leaders = getLeaders();


  if (!user) {
    return (
        <div className="Home">
          
      </div>
    )
  }
  if (!leaders) {
    return (
      <div className="Home">
        <FriendsComponent UserData={user} />
      </div>
    )
  }

  return (
    <div className="Home">
      <FriendsComponent UserData={user} />
      <GlobalLeaderBoard Leaders={leaders}/>
    </div>
  );
}
