import React, { Component } from 'react'

export class Settings extends Component {
  render() {
    return (
      <div className='settingcontainer'>
        <form action="">
            <div className="inputcontainer">
                <label htmlFor="api">Api</label>
                <input name='api' type="radio" value={"true"}/> True
                <input name='api' type="radio" value={"false"}/> False
            </div>
        </form>
      </div>
    )
  }
}

export default Settings