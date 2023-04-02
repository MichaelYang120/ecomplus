import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';

export default function Main() {
  // debug
  var debug = true;

  type PArray = [
    name: string,
    price: string
  ]
  

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [productname, setProductName] = useState([])
  const [productprice, setProductPrice] = useState([])
  const [productarray, setProductarray] = useState<PArray[]>([])
  
  // click events
  const buyhandler = (event:any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    console.log(targetname + " $" + targetprice)

  }

  function incrementcart() {
    setCount(count + 1)
  }

  const addtocarthandler = (event:any) => {
    // event.preventDefault();
    var targetname = event.target.title;
    var targetprice = event.target.value;
    setProductName(targetname)
    setProductPrice(targetprice)
    if (debug == true) {

      console.log(productprice)
    }
    var newproductarray:PArray = [
      targetname,
      targetprice,
    ]
    if (debug === true ) {

      console.log(newproductarray)
    }
    var tmparray = newproductarray;
    setProductarray(productarray => [...productarray, ...[newproductarray]])
    console.log(productarray.concat([tmparray]))
    incrementcart()
  }

  const headercarthandler = (event:any) => {
    console.log("cart btn: " + productarray)
    console.log(event)
    
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
        <div className="cartcontainer">
          <div className='cart' onClick={headercarthandler}>{count > 0 ? "Number of Items In My Cart: " + count : "Cart Is Empty"}</div>
          <div className='headercheckout'>
            <a className='headercheckouttext' href='/'>Checkout</a>
          </div>
        </div>
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