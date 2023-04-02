import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';

export default function Main() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getproducts() {
      var product = await Productget();
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
              <p className='productprice'>${
                Number.isInteger(price) ? price + ".00" : price
              }</p>
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