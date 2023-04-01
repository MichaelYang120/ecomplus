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

  const clickHandler = () => {
    console.log("click")
    async function test () {
      
      var product = await Productget();
      console.log(typeof(product));
      console.log(Object.entries(product).length);
      // Object.entries(product).forEach(([key, value]) => {
      //   console.log(key + value)
      // })
      for (let value of Object.values(product)) {
        console.log(value); // John, then 30
      }
    }
    test()
    // setProducts([...products, product])
  }

  useEffect(() => {
    async function test() {

      var product = await Productget();
      setProducts(product)
    }
    test()
  }, [])
    return (
    <>
        {Object.entries(products).map(([key, subject], id) => (
          <li className="travelcompany-input" key={id}>
            <span className="input-label">{key}</span>
          </li>
        ))}
      <div className='mainconatiner'>
        <div></div>
        <div>this is the main content</div>
        <button onClick={clickHandler}>Test</button>
      </div>
    </>
  )
}


