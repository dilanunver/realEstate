import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleHouse from './SingleHouse'
import emptyHouse from '../pictures/emptyHouses.png'
import clear from '../pictures/clear.png'



const House = ({ houses, deletingItems }) => {
  const [byPriceActive, setByPriceActive] = useState(true)
  const [bySizeActive, setBySizeActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredHouse, setFilteredHouse] = useState([])
  const [showResult, setShowResult] = useState(false)

  const buttonPriceHandler = () => {
    setByPriceActive(true)
    setBySizeActive(false)
    console.log(filteredHouse)
    let sortByPrice = filteredHouse.sort(function (a, b) { return a.price - b.price });
    setFilteredHouse(sortByPrice)

  }
  const buttonSizeHandler = () => {
    setBySizeActive(true)
    setByPriceActive(false)
    let sortBySize = filteredHouse.sort(function (a, b) { return a.size - b.size })
    setFilteredHouse(sortBySize)
  }


  useEffect(() => {
    const filtered = houses.filter((house) => {
      if (searchTerm === '') {
        setShowResult(false)
        return true
      } else if (house.location.street.toLowerCase().includes(searchTerm.toLowerCase()) || (house.location.zip.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (house.location.city.toLowerCase().includes(searchTerm.toLowerCase())) || (house.price.toString().includes(searchTerm.toString()))) {
        setShowResult(true)
        return true
      }

      return false
    })
    if (byPriceActive) {
      setFilteredHouse(filtered.sort(function (a, b) { return a.price - b.price }))
    } else {
      setFilteredHouse(filtered.sort(function (a, b) { return a.size - b.size }))
    }

  }, [searchTerm, houses])
  const handleInputValue = (e) => {
    setSearchTerm(e.target.value)
  }
  const resetInputField = () => {
    setSearchTerm("");
  };


  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <Link className='create' to="/createPost" >Create New</Link>
      </div>
      <div className='input-sorting'>

        <input type='text' className='input' value={searchTerm} placeholder='Search for a house' onChange={handleInputValue}
        />
        {searchTerm && <img src={clear} alt='clear' className='input-clear' onClick={resetInputField}></img>}
        <div className='by'>
          <button onClick={() => buttonPriceHandler()} className={byPriceActive ? 'by-price active' : 'by-price'} >Price</button>
          <button onClick={() => buttonSizeHandler()} className={bySizeActive ? 'by-size active' : 'by-size'}>Size</button>
        </div>
      </div>
      <div className='show-result'>
        {showResult && filteredHouse.length > 0 && `${filteredHouse.length} results found`}

      </div>

      {filteredHouse.length === 0 &&
        <div className='filtered-houses'>
          <img src={emptyHouse} alt='empty-house'></img>
          <p>No results found. <br />
            Please try another keyword.</p>
        </div>
      }
      {filteredHouse.map((house) => {

        return (
          <SingleHouse house={house} deletingItems={deletingItems} ></SingleHouse>
        )
      })
      }

    </div >
  )
}


export default House