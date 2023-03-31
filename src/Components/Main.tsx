import React, { useState } from 'react'
import { Productget } from '../Api/Apirequest';

type TProduct = {

  category : String,
  description : String,
  id : Number,
  image : String,
  price : Number,
  rating : { rate: Number, count: Number }
  title : String
}


export default function Main() {
  const [products, setProducts] = useState([])
  // const [products, setProducts] = useState<TProduct[]>([])

  const clickHandler = () => {
    var product = Productget();
    console.log((product))
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


