import React, {useContext} from "react";
import "../../scss/home.scss";
import HomeComponent from "./homeComponent";
import UserOverview from "../../Components/userOverview";
import { getLeaders } from "../../Hooks/getLeaders"
import UserContext  from "../../Context/UserContext";

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

// ------- create room----------
//
// At the time of clicking CREATE button; socket.join(ID: 1)

// const createRoom = () => {
//   socket?.emit("joinRoom")
// }

// --------- Add user to My room --------------
//
// emit("socket", 'id of my room') {server: join}

// ----------- send a message in my room ------------
//
// emit(sendMessage with my room ID and my socket ID)

// const sendMessage = (message) => {
//   socket?.emit("sendMessage", message)
// }

// ----------- leave the room -------------
//
// emit to leaveRoom with my socket ID


// ------------ INBOX ----------------