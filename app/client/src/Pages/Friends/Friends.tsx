import "../../scss/home.scss";
import SideBar from "../../Components/Sidebar";
import FriendsComponent from "./FriendsComponent";
import { getUserData } from "../../Hooks/getUserData";
import GlobalLeaderBoard from "../../Components/GlobalLeaderBoard";

export default function Friends() {

  const { userData } = getUserData();

  if (!userData) {
    return (
      <div className="Home">
      <SideBar />
      </div>
    )
  }

  return (
    <div className="Home">
      <SideBar />
      <FriendsComponent UserData={userData} />
      {/* <GlobalLeaderBoard /> */}
    </div>
  );
}
