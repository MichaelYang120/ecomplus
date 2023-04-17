import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';
import { showupbtn, bubbleSort } from '../Functions/Functions';


export default function Main() {
  // debug
  // var debug = true;
  var debug = false;

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
  const [sortaccendstat, setSortaccendstat] = useState(false);
  const [pricecolorstatus, setpricecolorstatus] = useState(false);
  const [defaultcolorstatus, setdefualtcolorstatus] = useState(false);
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
  // add to cart click function
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
    // this is where we append to the array
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
    // this error is for no products in the cart, then it will display a message
    if (cartarray.length === 0) {
      alert("please make a selection")
    } else {
      var mycart: any = { "mycart": cartarray };
      setCartarray(cartarray)
      if(debug === true) {
        console.log(mycart)

      }
      setCartpopup(true);
    
    }
  }

  // this is where we set the state for cart popup status
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
  
  // this is where we show the cart popup
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

  // this is scroll to top function
  const scrolltotop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // this is the click function to sort by accending prices and then reseting the array to rerender the new data set
  const sortbyprice = () => {
    // setProducts(products)
    if(debug === true) {
      console.log("clicked")

    }
    setSortaccendstat(true)
    if(defaultcolorstatus === true) {
      setpricecolorstatus(true)
      setdefualtcolorstatus(false)

    } else {
      setpricecolorstatus(true)
    }

    bubbleSort(products, 'price')
    for (let i = 0; i < products.length; i++) {
      setProductsPriceAccend(products[i])
      if (debug === true) {
        // console.log(products[i]);
        // console.log(typeof(products) + "products")
        // console.log((products) + "products")
        // console.log(typeof(productsPriceAccend) + "new products")

      }

      setProducts((productsPriceAccend) => [...productsPriceAccend])
    }
  }

  const defaultsort = () => {
    if(debug === true) {
      console.log(sortaccendstat)

    }
    if(sortaccendstat === true) {
      setSortaccendstat(false)
      setProducts(products)
      if(pricecolorstatus === true) {
        setdefualtcolorstatus(true)
        setpricecolorstatus(false)

      } else (
        setdefualtcolorstatus(true)
 
      )
      
    }
  }

  // this is how we show the sort by price btn // todo: if there are multiple sort methods maybe consider a dropdown option rather then a button
  function sortproducts () {
    return (
      <div className='headercheckout'>
        <a className='headercheckouttext' style={{ color: pricecolorstatus === true ? "#0e73cb" : "aliceblue" }} onClick={sortbyprice} >Sort By Price</a>
        <a className='headercheckouttext' style={{ color: defaultcolorstatus === true ? "#0e73cb" : "aliceblue" }} onClick={defaultsort} >Default</a>
      </div>
    )
  }

  useEffect(() => {
    async function getproducts() {
      var product = await Productget();
      setProducts(product)
    }
    // if statements are added to prevent rerendering
    if (sortaccendstat === false) {
      getproducts()
      setSortaccendstat(true)

    }
  
  }, [scrolltotop, sortbyprice])



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
          {sortproducts()}
          <div className='cart' onClick={headercarthandler}>{count > 0 ? "Number of Items In My Cart: " + count : "Cart Is Empty"}</div>
          <div className='headercheckout'>
            <a className='headercheckouttext' href='/'>Checkout</a>
          </div>
        </div>

        {showupbtn(scrolltotop)}

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
            <img className='productimage' src={image} alt="prodcutimg" />
          </div>
        )}
      </div>
    </>
  )
}

// todo: sort array, or filter items
// todo: consider adding filter to my cart
// todo: fix/abstract color change for sort method, it should be in a function