import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';


interface valueinterface {
  category?: String;
  description?: String;
  id?: Number;
  image?: String;
  price?: Number;
  rating?: { rate: Number, count: Number };
  title?: String;
}

type valuetype = {
  category?: String;
  description?: String;
  id?: Number;
  image?: String;
  price?: Number;
  rating?: { rate: Number, count: Number };
  title?: String;
}


var Value: valueinterface = {};

export default function Main() {

  const [products, setProducts] = useState([])

  // type value = any | unknown;

  useEffect(() => {
    async function getproducts() {
      var product = await Productget();
      (Object.keys(product) as (keyof typeof product)[]).forEach((key, index) => {
        var productprice = product[key].price;
        console.log(productprice + "0")
        // var newproductprice = RegExp(/^\d+(,\d{1,2})?$/)
        // var regex = /^\d+(,\d{1,2})?$/
        // console.log(regex(productprice))
        var newprice = productprice + "0"
      });

      setProducts(product)
    }
    getproducts()
  }, [])


    return (
    <>
      <div className='mainconatiner'>
        {products.map(({ id, title, description, image, price }) => 
          <div className="productcontainer" key={id}>
            <div className='productinnercontainer'>
              <h2 className='productname'>{title}</h2>
              <p className='productdesc'>{description}</p>
              <p className='productprice'>${price}</p>
              <div className='buttoncontainer'>
                <button className='shopbtn'>Buy Now</button>
                <button className='shopbtn'>Add To Cart</button>
              </div>
            </div>
            <img className='productimage' src={image} alt=""/>
          </div>
        )}
      </div>
    </>
  )
}


