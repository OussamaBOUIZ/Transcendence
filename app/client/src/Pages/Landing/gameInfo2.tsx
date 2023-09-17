import React from "react";
import rectangle from "../../Assets/Rectangle.svg"
import card2 from "../../Assets/Card-2.svg"

export default function GameInfo2() {
    
    return (
        <div className="gameInfo gameInfo2 h-screen">
            <div className="content h-full flex justify-between items-center px-28 !pr-4">
                <figure className="w-2/5 flex flex-col gap-4">
                    <div className="flex gap-4 items-center font-semibold">
                        <img src={rectangle} alt="" />
                        <h1>Convallis phasellus nisi felis urna </h1>
                    </div>
                    <p>Convallis phasellus nisi felis urna in. Volutpat dolor rhoncus platea tristique. Egestas proin lobortis sit mauris aliquet. Condimentum congue adipiscing pharetra in pellentesque. Sed scelerisque commodo interdum dolor diam.<br></br><br></br>Nunc gravida consectetur dignissim mattis magna vulputate tellus inerisque consequat gravida risus in.<br></br>At aliquam nibh quam arcu mattis arcu massa sit at. Ridiculus metus in massa. Magna gravida volutpat molestie tristique dapibus dolor pretium fames ut mauris.</p>
                </figure>
                <img className="tableIMG" src={card2} alt="" />
            </div>
        </div>
    )
}