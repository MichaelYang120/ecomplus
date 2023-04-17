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


// this is to sort the array
export function bubbleSort(a: any, par: any) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i][par] > a[i + 1][par]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}