import React from "react";
import rectangle from "../../Assets/Rectangle.svg"
import card1 from "../../Assets/Card-1.svg"
import { Link } from "react-router-dom";


export default function GameInfo1() {
    return (
        <div id="gameInfo" className="gameInfo h-full bg-black">
            <div className="h-full flex justify-between items-center px-28">
                <img src={card1} alt="" />
                <figure className="w-2/5 flex flex-col gap-4">
                    <div className="flex gap-4 items-center font-semibold">
                        <img src={rectangle} alt="" />
                        <h1>Convallis phasellus nisi felis urna </h1>
                    </div>
                    <p>Convallis phasellus nisi felis urna in. Volutpat dolor rhoncus platea tristique. Egestas proin lobortis sit mauris aliquet. Condimentum congue adipiscing pharetra in pellentesque. Sed scelerisque commodo interdum dolor diam.<br></br><br></br>Nunc gravida consectetur dignissim mattis magna vulputate tellus inerisque consequat gravida risus in.<br></br>At aliquam nibh quam arcu mattis arcu massa sit at. Ridiculus metus in massa. Magna gravida volutpat molestie tristique dapibus dolor pretium fames ut mauris.</p>
                    <Link to='/sign' className="button">Play Now</Link>
                </figure>
            </div>
        </div>
    )
}