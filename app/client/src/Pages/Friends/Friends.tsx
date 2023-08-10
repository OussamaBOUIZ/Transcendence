import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import FriendsComponent from "./FriendsComponent";
import { getUserData } from "../../Hooks/getUserData";
import GlobalLeaderBoard from "../../Components/GlobalLeaderBoard";
import { getLeaders } from "../../Hooks/getLeaders";

export default function Friends() {

  const userData = getUserData();
  const leaders = getLeaders();


  if (!userData) {
    return (
        <div className="Home">
      </div>
    )
  }
  if (!leaders) {
    return (
      <div className="Home">
        <FriendsComponent UserData={userData} />
      </div>
    )
  }

  return (
    <div className="Home">
      <FriendsComponent UserData={userData} />
      <GlobalLeaderBoard Leaders={leaders}/>
    </div>
  );
}
