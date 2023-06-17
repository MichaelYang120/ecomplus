import { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';


export default function LandingPage() {

    const [products, setProducts] = useState([])
    const [randomimage, setRandomimage] = useState("")

    // var newproduct = products[Math.floor(Math.random() * products.length)];
    // setRandomproduct(newproduct)
    // console.log(newproduct)

    // function setRandomproduct() {
    //     let random: PArray = products[Math.floor(Math.random() * products.length)]
    //     let newrandomimage = random?.image;
    //     setRandomimage(newrandomimage)

    // }

    useEffect(() => {
        async function getproducts() {
            var product = await Productget();
            setProducts(product);

            let random:any = products[Math.floor(Math.random() * products.length)];
            setRandomimage(random.image);
        }
        getproducts();
        // setRandomproduct()
        console.log(randomimage)
    },[])
    
    function featuredimg() {
        console.log("hit")
        // setRandomproduct()
        console.log(randomimage)
        return (
            <img className='landingpageimg' src={randomimage} alt='' />
        )
    }

    return (
        <>
            <div className="landingpagecontainer">
                {featuredimg()}
                <div>
                    <h1>Heading goes here</h1>
                    <p>descriptive text</p>
                    <button>to main cart page</button>
                </div>
            </div>
        </>
    )
}