import React, { ReactEventHandler } from "react";

export function showupbtn(scrolltotop:ReactEventHandler) {
    const pagelocation = window.pageYOffset;
    return (
        pagelocation > 200 ?
            <div className='scrolltotopcontainer'>
                <button className='scrolltotopbtn' onClick={scrolltotop}>^</button>
            </div> : ""
    )
}