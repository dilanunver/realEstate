import React from 'react'

const House = ({ houses }) => {

  console.log(houses)
  return (
    <div className='house'>
      <div className='headerCreate'><h1 className='header1'>Houses</h1>
        <button className='create'>+ Create New</button></div>
      {houses.map((house) => <h1>size: {house.size}m2</h1>)}


    </div>
  )
}


export default House