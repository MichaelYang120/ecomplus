import React, { Component } from 'react'
import { Productget } from '../Api/Apirequest';

const clickHandler = () => {
  console.log("working");
  Productget();
}

export default class Main extends Component {

  render() {
    return (
        <>
          <div className='mainconatiner'>
            <div>this is the main content</div>
            <button onClick={clickHandler}>Test</button>
          </div>
        </>
    )
  }
}


