import React, { useState } from 'react'
import SingleHouse from './SingleHouse'



const House = ({ houses }) => {

  const [byPriceActive, setByPriceActive] = useState(false)
  const [bySizeActive, setBySizeActive] = useState(false)
  const buttonPriceHandler = () => {
    setByPriceActive(true)
    setBySizeActive(false)

  };
  const buttonSizeHandler = () => {
    setBySizeActive(true)
    setByPriceActive(false)
  }



  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <button className='create'>Create New</button>
      </div>
      <div className='input-sorting'>
        <input type='text' className='input' placeholder='Search for a house' />
        <div className='by'>
          <button onClick={() => buttonPriceHandler()} className={byPriceActive ? 'by-price active' : 'by-price'} >Price</button>
          <button onClick={() => buttonSizeHandler()} className={bySizeActive ? 'by-size active' : 'by-size'}>Size</button>
        </div>
      </div>
      {houses.map((house) =>
        <SingleHouse house={house}></SingleHouse>)
      }

    </div >
  )
}


export default House