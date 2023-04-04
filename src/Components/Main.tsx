import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';

export default function Main() {
  // debug
  var debug = true;

  interface PArray {
    name: String,
    price: String,
    image: string
  }

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [productarray, setProductarray] = useState<PArray[]>([])
  const [cartarray, setCartarray] = useState<PArray[]>([])
  const [cartpopup, setCartpopup] = useState(false);


  // click events
  const buyhandler = (event: any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    var targetimgurl = event.target.getAttribute("data-img");
    if (debug == true ) {
      console.log(event + "event")
      console.log(targetimgurl + "dataimg")
      console.log(targetname + " $" + targetprice)

    }
    console.log(totalcart() + "total")

  }

  function incrementcart() {
    setCount(count + 1)
  }

  const addtocarthandler = (event: any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    var targetimgurl = event.target.getAttribute("data-img");
    if (debug === true) {
      console.log("target image" + targetimgurl)
      console.log("event" + event.target)
    }
    var newproductarray: any = {
      "name": targetname,
      "price": targetprice,
      "image": targetimgurl
    }
    if (debug === true) {

      console.log(newproductarray)
    }
    var tmparray = newproductarray;
    setProductarray(productarray => [...productarray, ...[newproductarray]])
    if (debug === true) {
      console.log(productarray.concat([tmparray]))

    }
    var resultarray = productarray.concat([tmparray])
    incrementcart()
    setCartarray(resultarray)
  }

  const headercarthandler = (event: any) => {
    if (debug === true) {
      // console.log("cart btn: " + productarray)
      console.log(cartarray)
    }
    if(cartarray.length == 0) {
      alert("please make a selection")
    } else {
      var mycart: any = { "mycart": cartarray };
      console.log(mycart)
      setCartpopup(true);

    }
  }

  const closepopup = () => {
    setCartpopup(false);

  }

  useEffect(() => {
    async function getproducts() {
      var product = await Productget();
      setProducts(product)
    }
    getproducts()
  }, [])

  function showcartpopup() {
    return (
      cartarray.map(({ name, price, image }) =>
        <div className="cartpopupproductcontainer">
          <div className="cartpopupcontainertags">
            <div className='cartpopupname'>{name}</div>
            <div className='cartpopupprice'>${Number.isInteger(price) ? price + ".00" : price}</div>
          </div>
          <img className='cartpopupimage' src={image} />
        </div>
      )
    )
  }

  function totalcart () {
    Object.values(cartarray).forEach(values => {
      var totalprice = values.price
      var newtotalprice = Number(totalprice)

      console.log(newtotalprice)
      if(cartarray.length > 1) {
        var priceresults = newtotalprice + newtotalprice
        console.log(priceresults)
      }
    });


  }

  return (
    <>
      <div className='mainconatiner'>
        {cartpopup == true ? 
        <div className='cartpopupcontainer'>
          <button className='cartpopupbtn' onClick={closepopup}>X</button>
          {cartpopup && showcartpopup()}
        </div>
        : ""}

        <div className="cartcontainer">
          <div className='cart' onClick={headercarthandler}>{count > 0 ? "Number of Items In My Cart: " + count : "Cart Is Empty"}

          </div>
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
                <button className='shopbtn' onClick={buyhandler} title={title} value={price} data-img={image}>Buy Now</button>
                <button className='shopbtn' onClick={addtocarthandler} title={title} value={price} data-img={image}>Add To Cart</button>
              </div>
            </div>
            <img className='productimage' src={image} alt="" />
          </div>
        )}
      </div>
    </>
  )
}

// todo add a functional arrow to auto scroll to top of page