import React, { Component } from 'react'

export default class Headers extends Component {
  render() {
    return (
      <header>
        <div className='headercontainer'>
          <div className='logo'>LOGO</div>
          <div>
            <h1>
              My Ecom Plus

            </h1>
            {/* todo: search field */}
          </div>
          <div className='iconscontainer' id='iconscontainer'>
            Icons
          </div>
        </div>
      </header>
    )
  }
}
