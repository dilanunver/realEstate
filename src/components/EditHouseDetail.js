import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SingleInput from "./SingleInput";
import Description from "./Description";
import remove from '../pictures/remove.png'
import plus from '../pictures/plus.png'

const EditHouseDetail = (detailForHouses) => {

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
  const [description, setDescription] = useState('')
  const [prevImage, setPrevImage] = useState(null);
  const inputRef = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)

  console.log(detailForHouses)
  const item = detailForHouses.detailForHouses
  console.log(item.location.street)


  const handlePicture = (e) => {
    uploadingImage(e)
    setImage(e.target.files)
  }
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

      reader.onloadend = () => {
        setPrevImage(reader.result)

      };
      reader.readAsDataURL(selected)

    } else {
      setError(true)
    }

  }
  const save = () => {


    const editingHeaders = new Headers();
    editingHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

    var editHeaders = new Headers();
    editHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

    console.log(detailForHouses)
    var formdata = new FormData();
    formdata.append("price", detailForHouses.price);
    formdata.append("bedrooms", detailForHouses.rooms.bedroom);
    formdata.append("bathrooms", detailForHouses.rooms.bathroom);
    formdata.append("houseNumber", detailForHouses.houseNum);
    formdata.append("numberAddition", detailForHouses.addition);
    formdata.append("size", detailForHouses.size);
    formdata.append("streetName", detailForHouses.location.street);
    formdata.append("zip", detailForHouses.location.zip);
    formdata.append("city", detailForHouses.location.city);
    formdata.append("constructionYear", detailForHouses.constructionYear);
    formdata.append("hasGarage", detailForHouses.hasGarage);
    formdata.append("description", detailForHouses.description);

    var editOptions = {
      method: 'POST',
      headers: editHeaders,
      body: formdata,
      redirect: 'follow'
    };



    fetch(`https://api.intern.d-tt.nl/api/houses/${item.id}`, editOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    console.log(detailForHouses.id)
  }
  console.log(detailForHouses.detailForHouses.id)
  const isButtonDisabled = street === '' || houseNum === '' || postalCode === '' || city === '' || price === '' || size === '' || garage === '' || bedroom === '' || bathroom === '' || constructionDate === '' || description === '' || !prevImage

  return (
    <div className='create-post'>

      <Link className='back' to='/house'>Back to overview</Link>
      <h2>Create new listing</h2>
      <div className='all-inputs'>
        <SingleInput value={detailForHouses.street} required label={'Street name*'} placeholder={'Enter the street name'} onChange={(e) => setStreet(item.location.street)}></SingleInput>
        <div className='two-inputs-holder'>
          <SingleInput className={'two-inputs'} value={houseNum} required label={"House number*"} placeholder={'Enter house number'} onChange={(e) => setHouseNum(e.target.value)} ></SingleInput>
          <SingleInput className={'two-inputs'} value={addition} label={"Addition (optional)"} placeholder={'e.g. A'} onChange={(e) => setAddition(e.target.value)} ></SingleInput>
        </div>
        <SingleInput value={postalCode} required label={'Postal code*'} placeholder={'e.g. 1000 AA'} onChange={(e) => setPostalCode(e.target.value)}></SingleInput>
        <SingleInput value={city} required label={'City*'} placeholder={'e.g. Utrecht'} onChange={(e) => setCity(e.target.value)}></SingleInput>
        <div className='single-input'>
          Upload picture (PNG or JPG)*
          <label htmlFor='file-image'>
            <div style={{ background: prevImage ? `url("${prevImage}") no-repeat center/cover` : `url("${plus}") no-repeat center` }} className='dotted' ></div>
          </label>
          <input type='file' required ref={inputRef} alt='image' onChange={handlePicture} id='file-image' ></input>
          {!prevImage && showErrorMessage ? <p className='error-message'>Required field missing</p> : ''}
          {prevImage && (
            <img src={remove} alt='remove' onClick={() => { inputRef.current.value = ''; setPrevImage(null) }} className='remove'></img>)}
          <div className='error'>
            {error && <p>File not supported</p>}
          </div>
        </div>
        <SingleInput value={price} required label={'Price*'} placeholder={'e.g. €150.000'} onChange={(e) => setPrice(e.target.value)}></SingleInput>

        <div className='two-inputs-holder'>
          <SingleInput className={'two-inputs'} value={size} required label={"Size*"} placeholder={'e.g. 60m2'} onChange={(e) => setSize(e.target.value)} ></SingleInput>
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
          <SingleInput className={'two-inputs'} value={bedroom} required label={"Bedrooms*"} placeholder={'Enter amount'} onChange={(e) => setBedroom(e.target.value)} ></SingleInput>
          <SingleInput className={'two-inputs'} value={bathroom} required label={"Bathrooms*"} placeholder={'Enter amount'} onChange={(e) => setBathroom(e.target.value)} ></SingleInput>
        </div>
        <SingleInput value={constructionDate} required label={'Construction date*'} placeholder={'e.g. 1990'} onChange={(e) => setConstructionDate(e.target.value)}></SingleInput>
        <Description value={description} required label={'Description'} placeholder={'Enter description'} onChange={(e) => setDescription(e.target.value)}></Description>

        <div className='single-input'>
          <button className='button-post' disabled={isButtonDisabled} onClick={save}>Save</button>

        </div>

      </div>

    </div >

  )


}

export default EditHouseDetail;



