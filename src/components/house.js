import React from 'react'
import SingleHouse from './SingleHouse'



const House = ({ houses }) => {


  return (
    <div className='house'>

      <div className='headerCreate'>
        <h1 className='header1'>Houses</h1>
        <button className='create'>Create New</button>
      </div>

      <input type='text' className='input' placeholder='Search for a house' />

      {houses.map((house) =>
        <SingleHouse house={house}></SingleHouse>)
      }

    </div >
  )
}


export default House