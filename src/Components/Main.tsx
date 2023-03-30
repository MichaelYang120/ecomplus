import React, { useState } from 'react'
import { Productget } from '../Api/Apirequest';

export default function Main() {
  const [products, setProducts] = useState([])

  const clickHandler = () => {
    // console.log("working");
    var results = Productget();
    setProducts(results!)

    console.log("this is setproducts" + setProducts)
  }
  return (
    <>
      <div className='mainconatiner'>
        <div></div>
        <div>this is the main content</div>
        <button onClick={clickHandler}>Test</button>
      </div>
    </>
  )
}


