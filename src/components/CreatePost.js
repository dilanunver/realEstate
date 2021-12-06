import React, { useState } from "react";
import { Link } from "react-router-dom";
import plus from '../pictures/plus.png'



const CreatePost = () => {

  const [street, setStreet] = useState('test')
  const [houseNum, setHouseNum] = useState(23)
  const [addition, setAddition] = useState('')
  const [postalCode, setPostalCode] = useState(3222)
  const [city, setCity] = useState('amst')
  const [price, setPrice] = useState(322)
  const [size, setSize] = useState('22m2')
  const [garage, setGarage] = useState('yes')
  const [bedroom, setBedroom] = useState(2)
  const [bathroom, setBathroom] = useState(2)
  const [constructionDate, setConstructionDate] = useState(1995)
  const [description, setDescription] = useState('test')
  const [image, setImage] = useState('')


  const uploadingImage = async (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }


  const post = () => {

    var myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "jSW54MUV9fmlHLsg_XdCT3xq6DAvaJch");

    var formdata = new FormData();
    formdata.append("price", price);
    formdata.append("bedrooms", bedroom);
    formdata.append("bathrooms", bathroom);
    formdata.append("size", size);
    formdata.append("streetName", street);
    formdata.append("houseNumber", houseNum);
    formdata.append("numberAddition", addition);
    formdata.append("zip", postalCode);
    formdata.append("city", city);
    formdata.append("constructionYear", constructionDate);
    formdata.append("hasGarage", garage);
    formdata.append("description", description);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://intern-api.docker-dev.d-tt.nl/api/houses", requestOptions)
      .then(response => response.json())
      .then(gettingData => {
        console.log(gettingData)
        var imageFormData = new FormData();
        imageFormData.append("image", image, image.name);

        fetch(`https://intern-api.docker-dev.d-tt.nl/api/houses/${gettingData.id}/upload`, {
          method: 'POST',
          headers: myHeaders,
          body: imageFormData,
          redirect: 'follow'
        }
        )
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));

  }

  return (
    <div className='create-post'>
      <Link className='back' to='/house'>Back to overview</Link>
      <h2>Create new listing</h2>
      <div className='all-inputs'>
        <div className='single-input'>
          <label>Street name*</label>
          <input value={street} required type='text' placeholder='Enter the street name' onChange={(e) => setStreet(e.target.value)}></input>

        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>House number*</label>
            <input value={houseNum} type='text' placeholder='Enter house number' onChange={(e) => setHouseNum(e.target.value)}></input>
          </div>
          <div className='two-inputs'>
            <label>Addition (optional) </label>
            <input value={addition} type='text' placeholder='e.g. A' onChange={(e) => setAddition(e.target.value)}></input>
          </div>
        </div>
        <div className='single-input'>
          <label>Postal code*</label>
          <input value={postalCode} type='text' placeholder='e.g. 1000 AA' onChange={(e) => setPostalCode(e.target.value)}></input>
        </div>
        <div className='single-input'>
          <label>City*</label>
          <input value={city} type='text' placeholder='e.g. Utrecht' onChange={(e) => setCity(e.target.value)}></input>
        </div>
        <div className='single-input'>
          <label for='file-image'>Upload picture (PNG or JPG)*
            <img src={plus} className='dotted' alt='plus' accept='.jpg, .png' ></img>
          </label>
          <input type='file' alt='image' onChange={uploadingImage} id='file-image' ></input>
        </div>
        <div className='single-input'>
          <label>Price*</label>
          <input value={price} type='text' placeholder='e.g. €150.000' onChange={(e) => setPrice(e.target.value)}></input>
        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>Size*</label>
            <input value={size} type='text' placeholder='e.g. 60m2' onChange={(e) => setSize(e.target.value)}></input>
          </div>
          <div className='two-inputs'>
            <label>Garage </label>
            <select value={garage} className='garage' onChange={(e) => setGarage(e.target.value)}>
              <option value="" disabled selected>Select</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
        </div>
        <div className='two-inputs-holder'>
          <div className='two-inputs'>
            <label>Bedrooms*</label>
            <input value={bedroom} type='text' placeholder='Enter amount' onChange={(e) => setBedroom(e.target.value)}></input>
          </div>
          <div className='two-inputs'>
            <label>Bathrooms* </label>
            <input value={bathroom} type='text' placeholder='Enter amount' onChange={(e) => setBathroom(e.target.value)}></input>
          </div>
        </div>
        <div className='single-input'>
          <label>Construction date*</label>
          <input value={constructionDate} type='text' placeholder='e.g. 1990' onChange={(e) => setConstructionDate(e.target.value)}></input>
        </div>
        <div className='single-input'>
          <label>Description*</label>
          <textarea value={description} className='text-area' placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className='single-input'>
          <button className='button-post' onClick={post}>Post</button>
        </div>

      </div>

    </div>

  )


}

export default CreatePost;