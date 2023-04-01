import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';

type subject = {

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

  useEffect(() => {
    async function test() {

      var product = await Productget();
      setProducts(product)
    }
    test()
  }, [])
    return (
    <>
        {products.map(({id, title}: any) => <li key={id}>{title}</li>)}
      <div className='mainconatiner'>
        <div></div>
        <div>this is the main content test</div>
      </div>
    </>
  )
}


