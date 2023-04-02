import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';

export default function Main() {

  const [products, setProducts] = useState([]);
  
  // click events
  const buyhandler = (event:any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    console.log(targetname + " $" + targetprice)

  }
  
  const addtocarthandler = (event:any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    console.log(targetname + " $" + targetprice)

  }

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
              <p className='productprice'>
                ${Number.isInteger(price) ? price + ".00" : price}
              </p>
              <div className='buttoncontainer'>
                <button className='shopbtn' onClick={buyhandler} title={title} value={price}>Buy Now</button>
                <button className='shopbtn' onClick={addtocarthandler} title={title} value={price}>Add To Cart</button>
              </div>
            </div>
            <img className='productimage' src={image} alt=""/>
          </div>
        )}
      </div>
    </>
  )
}