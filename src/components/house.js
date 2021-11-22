import React, { useState } from 'react'



const House = ({ houses }) => {


  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <button className='create'>Create New</button>
      </div>

      <input type='text' className='input' placeholder='Search for a house' />

      {houses.map((house) =>
        <div className='houseInfo'>

          <img className='houseImg'
            src={house.image}
            alt='houseImg'>
          </img>
          <span className='street'>
            {house.location.street}</span>

        </div>)}



    </div>
  )
}


export default House