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
      <div className='mainconatiner'>
          {/* <div>{products.map(({ id, title, description, image }) =>
            <li key={id}>{title}{description}{image}</li>)}
            </div> */}

            {products.map(({ id, title, description, image, price }) => 
              <div className="productcontainer" key={id}>
                <div className='productinnercontainer'>
                  <label className='productname'>{title}</label>
                  <p className='productdesc'>{description}</p>
                  <p className='productprice'>{price}</p>
                  <div className='buttoncontainer'>
                    <button className='shopbtn'>Add To Cart</button>
                    <button className='shopbtn'>Buy Now</button>
                  </div>
                </div>
                <img className='productimage' src={image} alt=""/>
              </div>
              
            
            )}

        {/* <div>this is the main content test</div> */}
      </div>
    </>
  )
}


