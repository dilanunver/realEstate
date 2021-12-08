import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import plus from '../pictures/plus.png'
import remove from '../pictures/remove.png'
import Description from "./Description";
import SingleInput from "./SingleInput";


const CreatePost = () => {

  const [street, setStreet] = useState('')
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
  const [prevImage, setPrevImage] = useState(null)
  const [error, setError] = useState(false)
  const inputRef = useRef();
  const [isPosted, setIsPosted] = useState(false)


  const uploadingImage = async (e) => {
    setError(false)
    const selected = e.target.files[0]
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
    if (selected === undefined) {
      console.log('bos')
      return
    }
    if (selected && allowedTypes.includes(selected.type)) {
      let reader = new FileReader();
      console.log(reader)
      reader.onloadend = () => {
        setPrevImage(reader.result)
      };
      reader.readAsDataURL(selected)
      console.log('selected')
    } else {
      setError(true)
    }

  }


  const post = () => {
    setIsPosted(true);
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
        <SingleInput value={street} isPosted={isPosted} required label={'Street name*'} placeholder={'Enter the street name'} onChange={(e) => setStreet(e.target.value)}></SingleInput>
        <div className='two-inputs-holder'>
          <SingleInput className={'two-inputs'} value={houseNum} isPosted={isPosted} required label={"House number*"} placeholder={'Enter house number'} onChange={(e) => setHouseNum(e.target.value)} ></SingleInput>
          <SingleInput className={'two-inputs'} value={addition} label={"Addition (optional)"} placeholder={'e.g. A'} onChange={(e) => setAddition(e.target.value)} ></SingleInput>
        </div>
        <SingleInput value={postalCode} isPosted={isPosted} required label={'Postal code*'} placeholder={'e.g. 1000 AA'} onChange={(e) => setPostalCode(e.target.value)}></SingleInput>
        <SingleInput value={city} isPosted={isPosted} required label={'City*'} placeholder={'e.g. Utrecht'} onChange={(e) => setCity(e.target.value)}></SingleInput>
        <div className='single-input'>
          Upload picture (PNG or JPG)*
          <label htmlFor='file-image'>
            <div style={{ background: prevImage ? `url("${prevImage}") no-repeat center/cover` : `url("${plus}") no-repeat center` }} className='dotted' ></div>
          </label>
          <input type='file' isPosted={isPosted} required ref={inputRef} alt='image' onChange={uploadingImage} id='file-image' ></input>
          {isPosted && image === '' ? <p className='error-message'>Required field missing</p> : ''}
          {prevImage && (
            <img src={remove} alt='remove' onClick={() => { inputRef.current.value = ''; setPrevImage(null) }} className='remove'></img>)}
          <div className='error'>
            {error && <p>File not supported</p>}
          </div>
        </div>
        <SingleInput value={price} isPosted={isPosted} required label={'Price*'} placeholder={'e.g. €150.000'} onChange={(e) => setPrice(e.target.value)}></SingleInput>

        <div className='two-inputs-holder'>
          <SingleInput className={'two-inputs'} value={size} isPosted={isPosted} required label={"Size*"} placeholder={'e.g. 60m2'} onChange={(e) => setSize(e.target.value)} ></SingleInput>
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
          <SingleInput className={'two-inputs'} value={bedroom} isPosted={isPosted} required label={"Bedrooms*"} placeholder={'Enter amount'} onChange={(e) => setBedroom(e.target.value)} ></SingleInput>
          <SingleInput className={'two-inputs'} value={bathroom} isPosted={isPosted} required label={"Bathrooms*"} placeholder={'Enter amount'} onChange={(e) => setBathroom(e.target.value)} ></SingleInput>
        </div>
        <SingleInput value={constructionDate} isPosted={isPosted} required label={'Construction date*'} placeholder={'e.g. 1990'} onChange={(e) => setConstructionDate(e.target.value)}></SingleInput>
        <Description value={description} isPosted={isPosted} required label={'Description'} placeholder={'Enter description'} onChange={(e) => setDescription(e.target.value)}></Description>

        <div className='single-input'>
          <button className='button-post' onClick={post}>Post</button>
        </div>

      </div>

    </div>

  )


}

export default CreatePost;