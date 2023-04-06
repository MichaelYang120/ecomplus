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

  // type  = [
  //   number
  // ]


  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [productarray, setProductarray] = useState<PArray[]>([])
  const [cartarray, setCartarray] = useState<PArray[]>([])
  const [cartpopup, setCartpopup] = useState(false);
  const [totalcart, setTotalcart] = useState("")


  // click events
  const buyhandler = (event: any) => {
    // var targetname = event.target.title;
    // var targetprice = event.target.value;
    // var targetimgurl = event.target.getAttribute("data-img");
    if (debug === true ) {
      // console.log(event + "event")
      // console.log(targetimgurl + "dataimg")
      // console.log(targetname + " $" + targetprice)
      // console.log(totalcartvalue() + "total")
      // console.log(totalcart)
      // console.log(typeof(totalcart))

    }

  }

  function incrementcart() {
    setCount(count + 1)
  }
  var price:number

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
    totalcartvalue(targetprice)
    console.log(targetprice)

  }

  const headercarthandler = (event: any) => {
    if (debug === true) {
      // console.log("cart btn: " + productarray)
      console.log(cartarray)
    }
    if(cartarray.length === 0) {
      alert("please make a selection")
    } else {
      var mycart: any = { "mycart": cartarray };
      console.log(mycart)
      setCartpopup(true);

    }
  }

  const closepopup = () => {
    setCartpopup(false);
    setTotalcart(totalcart)

  }

  function showcartpopup() {
    return (
      cartarray.map(({ name, price, image }) =>
        <div className="cartpopupproductcontainer">
          <div className="cartpopupcontainertags">
            <div className='cartpopupname' data-price={price}>{name}</div>
            <div className='cartpopupprice'>${Number.isInteger(price) ? price + ".00" : price}</div>
          </div>
          <img className='cartpopupimage' src={image} alt="cartpopupimage"/>
        </div>
      )
    )
  }

  function totalcartvalue (targetprice:any) {
    var cartname = document.querySelectorAll('.cartpopupname')

    let total = 0
    if(cartname.length < 1) {
      setTotalcart(targetprice)
    }
    cartname.forEach(element => {
      var elementprice = element.getAttribute("data-price")
      var newelementprice = (Number(elementprice))
      total += newelementprice
      
      var addnewtotal = total + Number(targetprice);
      var newtotal = addnewtotal.toFixed(2)
      if(debug === true) {
        console.log(newtotal)
        
      }
      setTotalcart(newtotal);
      if(debug === true) {
        console.log(totalcart)

      }
    });
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
        {cartpopup === true ? 
        <div className='cartpopupcontainer'>
          <button className='cartpopupbtn' onClick={closepopup}>X</button>
          {/* todo add style to cartprice and add functionality */}
          <div className='totalcartprice'>Total Price: ${totalcart}</div>
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