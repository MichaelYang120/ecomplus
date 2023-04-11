import React, { useEffect, useState } from 'react'
import { Productget } from '../Api/Apirequest';


export default function LandingPage() {

    const [products, setProducts] = useState([])

    function featuredimg() {
        return (
            <>
                {products.map(({ image }) => <img className='landingpageimg' src={image} alt='' />)}
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