import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SingleHouse from './SingleHouse'




const House = ({ houses, deletingItems }) => {


  const [byPrice, setByPrice] = useState(houses)
  const [bySize, setBySize] = useState(houses)
  const [byPriceActive, setByPriceActive] = useState(true)
  const [bySizeActive, setBySizeActive] = useState(false)


  const buttonPriceHandler = () => {
    setByPriceActive(true)
    setBySizeActive(false)
    let sortByPrice = houses.sort(function (a, b) { return a.price - b.price });
    setByPrice(sortByPrice)

  }
  const buttonSizeHandler = () => {
    setBySizeActive(true)
    setByPriceActive(false)
    let sortBySize = houses.sort(function (a, b) { return a.size - b.size })
    setBySize(sortBySize)
  }


  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <Link className='create' to="createPost" >Create New</Link>
      </div>
      <div className='input-sorting'>
        <input type='text' className='input' placeholder='Search for a house' />
        <div className='by'>
          <button onClick={() => buttonPriceHandler()} className={byPriceActive ? 'by-price active' : 'by-price'} >Price</button>
          <button onClick={() => buttonSizeHandler()} className={bySizeActive ? 'by-size active' : 'by-size'}>Size</button>
        </div>
      </div>
      {
        houses.map((house) =>
          <SingleHouse house={house} deletingItems={deletingItems} ></SingleHouse>)
      }

    </div >
  )
}


export default House