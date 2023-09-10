import "../scss/userOverview.scss";
import { User} from "../../global/Interfaces"
import React from "react";
import ContactDetail from "../Pages/Chat/ContactDetail";

// function GetAchievementsCard ({item} :{item: Achievement}) {
//     return (
//         <figure className="achievement">
//             <img src={item.image} alt="" className="achievement-icon" />
//             <figcaption className="achievement-info">
//                 <h5 className="achievement-title">{item?.badge_name}</h5>
//                 <h6 className="achievement-subtitle">{item?.description}</h6>
//             </figcaption>
//         </figure>
//     )
// }

export default function UserOverview ({UserData}: {UserData: User}) {

    // const AchievementsElements = UserData?.stat?.achievements?.map((item) => <GetAchievementsCard key={item.id} item={item} />)
    return (
        <div className="user_overview">
            <ContactDetail oview={UserData} />
        </div>
    );
}