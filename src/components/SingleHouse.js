import React, { useState } from 'react'
import deleteObj from '../pictures/delete.png'
import editObj from '../pictures/edit.png'



const SingleHouse = ({ house }) => {


  const [showItem, setShowItem] = useState(false)


  const ShowResult = () => {
    setShowItem(true)

  }
  return (
    < div className='houseInfo' onClick={ShowResult} onMouseEnter={() => setShowItem(true)}
    >
      <div style={{ display: 'flex' }}>
        <img className='houseImg'
          src={house.image}
          alt='houseImg'>
        </img>
        <div className='aboutHouse'>
          <h1 className='street'>
            {house.location.street}
          </h1>
          <div className='price'>
            €{house.price}
          </div>
          <div className='city'>
            {house.location.zip} {house.location.city}
          </div>
          <div className='insideHouse'>
            <div className='bed'>{house.rooms.bedrooms}</div>
            <div className='bath'>{house.rooms.bathrooms}</div>
            <div className='size'>{house.size} m2</div>

          </div>
        </div>
      </div>
      {showItem &&
        <div className='showing-items'>
          <img
            src={deleteObj}
            alt='houseObj'>
          </img>
          <img
            src={editObj}
            alt='houseObj'>
          </img>
        </div>
      }
    </div>)
}

export default SingleHouse