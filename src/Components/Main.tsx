import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';
import { showupbtn } from '../Functions/Functions';


export default function Main() {
  // debug
  var debug = true;

  interface PArray {
    name: string,
    price: string,
    image: string
  }

  const [products, setProducts] = useState([]);
  const [productsPriceAccend, setProductsPriceAccend] = useState([]);
  const [count, setCount] = useState(0);
  const [productarray, setProductarray] = useState<PArray[]>([])
  const [cartarray, setCartarray] = useState<PArray[]>([])
  const [cartpopup, setCartpopup] = useState(false);
  const [totalcart, setTotalcart] = useState("");

  // click events
  const buyhandler = (event: any) => {
    var targetname = event.target.title;
    var targetprice = event.target.value;
    var targetimgurl = event.target.getAttribute("data-img");
    if (debug === true) {
      console.log(event + "event")
      console.log(targetimgurl + "dataimg")
      console.log(targetname + " $" + targetprice)
      // console.log(totalcartvalue() + "total")
      // console.log(totalcart)
      // console.log(typeof(totalcart))

    }

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
      console.log(`event ${event}`)
    }
    var newproductarray: PArray = {
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
    if (debug === true) {
      console.log(resultarray)
      console.log(targetprice)

    }

    // this is below is for the cart price and summing up the total price 
    var total = 0;
    resultarray.forEach((value: PArray) => {
      var price = value.price
      var pricetonumber = Number(price)
      // this is where we sum up the total
      total += pricetonumber;
      // price is set to fix number of decimals
      var fixtotal = total.toFixed(2)
      // this is where we set our state variable
      setTotalcart(fixtotal)

    })

  }

  const headercarthandler = (event: any) => {
    if (debug === true) {
      // console.log("cart btn: " + productarray)
      console.log(cartarray)
    }
    if (cartarray.length === 0) {
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
  // this is to clear the cart
  const clearcart = () => {
    setTotalcart("");
    setCartarray([]);
    setCount(0);
    setProductarray([]);

  }

  function showcartpopup() {
    return (
      cartarray.map(({ name, price, image }) =>
        <div className="cartpopupproductcontainer">
          <div className="cartpopupcontainertags">
            <div className='cartpopupname' data-price={price}>{name}</div>
            <div className='cartpopupprice'>${Number.isInteger(price) ? price + ".00" : price}</div>
          </div>
          <img className='cartpopupimage' src={image} alt="cartpopupimage" />
        </div>
      )
    )
  }

  const scrolltotop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // this is to sort the array
  function bubbleSort(a:any, par:any) {
    var swapped;
    do {
      swapped = false;
      for (var i = 0; i < a.length - 1; i++) {
        if (a[i][par] > a[i + 1][par]) {
          var temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }

 

  const sortbyprice = () => {
    // setProducts(products)
    console.log("clicked")
    bubbleSort(products, 'price')
    var newarrayset = ""
    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      let newlist = products[i]
      setProductsPriceAccend(products[i])
      setProducts(productsPriceAccend)
    }
  }

  function showsortbyprice () {
    return (
      <button onClick={sortbyprice} >sort by price</button>
    )
  }

  useEffect(() => {
    async function getproducts() {
      var product = await Productget();
      setProducts(product)
    }
    getproducts()
    sortbyprice()
  }, [scrolltotop])



  return (
    <>
      <div className='mainconatiner'>
        {cartpopup === true ?
          <div className='cartpopupcontainer'>
            <button className='cartpopupbtn' onClick={closepopup}>X</button>
            <button className='clearcartbtn' onClick={clearcart}>Clear Cart</button>
            {totalcart === "" ? ""
              : <div className='totalcartprice'>Total Price: ${totalcart}</div>}
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

        {showupbtn(scrolltotop)}
          {showsortbyprice()}

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

// todo: sort array, or filter items