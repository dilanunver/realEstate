import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleHouse from './SingleHouse'




const House = ({ houses, deletingItems }) => {


  const [byPrice, setByPrice] = useState(houses)
  const [bySize, setBySize] = useState(houses)
  const [byPriceActive, setByPriceActive] = useState(true)
  const [bySizeActive, setBySizeActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredHouse, setFilteredHouse] = useState([])
  const [showResult, setShowResult] = useState(false)


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

  useEffect(() => {
    setFilteredHouse(houses.filter((house) => {
      if (searchTerm === '') {
        return true
      } else if (house.location.street.toLowerCase().includes(searchTerm.toLowerCase()) || (house.location.zip.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (house.location.city.toLowerCase().includes(searchTerm.toLowerCase())) || (house.price.toString().includes(searchTerm.toString()))) {
        setShowResult(true)
        return true
      }

      return false
    }))
  }, [searchTerm])

  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <Link className='create' to="/createPost" >Create New</Link>
      </div>
      <div className='input-sorting'>
        <input type='text' className='input' placeholder='Search for a house' onChange={(e) => { setSearchTerm(e.target.value) }} />
        <div className='by'>
          <button onClick={() => buttonPriceHandler()} className={byPriceActive ? 'by-price active' : 'by-price'} >Price</button>
          <button onClick={() => buttonSizeHandler()} className={bySizeActive ? 'by-size active' : 'by-size'}>Size</button>
        </div>
      </div>
      <div>
        {showResult && `${filteredHouse.length} result found`}
      </div>
      {filteredHouse.map((house) => {
        console.log(house)
        return (
          <SingleHouse house={house} deletingItems={deletingItems} ></SingleHouse>
        )
      })
      }

    </div >
  )
}


export default House