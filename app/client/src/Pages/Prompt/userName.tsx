// import Notification from "../../Components/Notification"

export default function userName({username, user, handleChange} : {username: string, user: string, handleChange: any}) {

  return (
    <>
        <p>Username</p>
        <div className="inputs">
            <input
              placeholder="User Name"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
        </div>
    </>
  );
}