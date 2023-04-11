import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';


export default function LandingPage() {

    const [products, setProducts] = useState([])
    const [randomimage, setRandomimage] = useState('')

    // var newproduct = products[Math.floor(Math.random() * products.length)];
    // setRandomproduct(newproduct)
    // console.log(newproduct)
    
    interface PArray {
        name: string,
        price: string,
        image: string
    }
    
    function featuredimg() {
        const random: PArray = products[Math.floor(Math.random() * products.length)]
        const newrandomimage = random.image
        setRandomimage(newrandomimage)
        return (
            <>
                <img className='landingpageimg' src={randomimage} alt=''/>
            </>

        )
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