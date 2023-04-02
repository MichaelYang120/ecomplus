import { Productget } from "../Api/Apirequest";
import React from "react";

// this function is to change the prices to append the decimal place ex: 100.00
export async function getproducts() {
    var product = await Productget();
    // this function is to change the prices to append the decimal place ex: 100.00
    function convertdecimals() {
        (Object.keys(product) as (keyof typeof product)[]).forEach((key, index) => {
            var productprice = product[key].price;
            // console.log(productprice)
            if (Number.isInteger(productprice)) {
                var newproductprice = productprice + ".00"
                return newproductprice;
            } else {
                // console.log(typeof(productprice))
                var stringnumber = productprice.toString()
                // console.log(stringnumber)
                var splitnumber = stringnumber.split(".")
                var decimalstring = splitnumber[1]
                // console.log(decimalstring.length)
                if (decimalstring.length == 1) {
                    var newproductprice = productprice + "0"
                    return newproductprice;
                }
            }
        });
    }
    product()
}