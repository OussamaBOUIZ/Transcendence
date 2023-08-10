// import Notification from "../../Components/Notification"
import {User, Data} from "../../../../global/Interfaces"

export default function fullName({fullName, user, handleChange} : {fullName: Data, user: User, handleChange: any}) {

  return (
    <>
        <p className="text-3xl lg:text-5xl md:text-4xl">Enter Full Name</p>
        <div className="inputs flex-col sm:flex-row">
            <input
              placeholder="First Name"
              type="text"
              name="firstname"
              value={fullName.firstname}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              value={fullName.lastname}
              onChange={handleChange}
            />
        </div>
    </>
  );
}