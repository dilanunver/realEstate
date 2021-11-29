import React from "react";
import { Link } from "react-router-dom";


const CreatePost = () => {
  return (
    <div className='create-post'>
      <Link className='back' to='/house'>Back to overview</Link>
      <h2>Create new listing</h2>
      <div className='all-inputs'>
        <div className='single-input'>
          <label>Street name*</label>
          <input type='text' placeholder='Enter the street name'></input>
        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>House number*</label>
            <input type='text' placeholder='Enter house number'></input>
          </div>
          <div className='two-inputs'>
            <label>Addition (optional) </label>
            <input type='text' placeholder='e.g. A'></input>
          </div>
        </div>
        <div className='single-input'>
          <label>Postal code*</label>
          <input type='text' placeholder='e.g. 1000 AA'></input>
        </div>
        <div className='single-input'>
          <label>City*</label>
          <input type='text' placeholder='e.g. Utrecht'></input>
        </div>
        <div className='single-input'>
          <label>Upload picture (PNG or JPG)*</label>
          <input type='text' className='dotted'></input>
        </div>
        <div className='single-input'>
          <label>Price*</label>
          <input type='text' placeholder='e.g. €150.000'></input>
        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>Size*</label>
            <input type='text' placeholder='e.g. 60m2'></input>
          </div>
          <div className='two-inputs'>
            <label>Garage </label>
            <select className='garage'>
              <option value="" disabled selected>Select</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>Bedrooms*</label>
            <input type='text' placeholder='Enter amount'></input>
          </div>
          <div className='two-inputs'>
            <label>Bathrooms* </label>
            <input type='text' placeholder='Enter amount'></input>
          </div>
        </div>
        <div className='single-input'>
          <label>Construction date*</label>
          <input type='text' placeholder='e.g. 1990'></input>
        </div>
        <div className='single-input'>
          <label>Description*</label>
          <textarea className='text-area' placeholder='Enter description'></textarea>
        </div>
        <div className='single-input'>
          <button className='button-post'>Post</button>
        </div>

      </div>

    </div>

  )


}

export default CreatePost;