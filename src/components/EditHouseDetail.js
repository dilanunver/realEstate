import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SingleInput from "./SingleInput";
import Description from "./Description";
import remove from '../pictures/remove.png'
import plus from '../pictures/plus.png'

const EditHouseDetail = ({ houses, headerFetch }) => {
  const navigate = useNavigate()

  const { id } = useParams()
  console.log(id)
  const [house, setHouse] = useState([])
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
  const [isPosted, setIsPosted] = useState(false)
  const [error, setError] = useState(false);



  useEffect(() => {
    const result = houses.find((house) => house.id === Number(id));

    let streetHouseNum = result.location.street.split(' ');
    let newHouseNum = streetHouseNum[streetHouseNum.length - 1]

    setHouse(result)
    setStreet(result.location.street)
    setHouseNum(newHouseNum)
    setPostalCode(result.location.zip)
    setCity(result.location.city)
    setPrice(result.price)
    setSize(result.size)
    setGarage(result.hasGarage)
    setBedroom(result.rooms.bedrooms)
    setBathroom(result.rooms.bathrooms)
    setConstructionDate(result.constructionYear)
    setDescription(result.description)
    setPrevImage(result.image)
  }, [])



  const handlePicture = (e) => {
    uploadingImage(e)
    setImage(e.target.files)

  }

  const uploadingImage = async (e) => {
    setError(false)
    const selected = e.target.files[0]
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
    if (selected === undefined) {
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
    setIsPosted(true)
    var editingHeaders = new Headers();
    editingHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

    var formdata = new FormData();
    formdata.append("price", price);
    formdata.append("bedrooms", bedroom);
    formdata.append("bathrooms", bathroom);
    formdata.append("houseNumber", houseNum);
    formdata.append("numberAddition", addition);
    formdata.append("size", size);
    formdata.append("streetName", street);
    formdata.append("zip", postalCode);
    formdata.append("city", city);
    formdata.append("constructionYear", constructionDate);
    formdata.append("hasGarage", garage);
    formdata.append("description", description);

    var requestOptions = {
      method: 'POST',
      headers: editingHeaders,
      body: formdata,
      redirect: 'follow'
    };

    var imageEdit = new FormData();
    imageEdit.append("image", image[0]);

    var editImageOptions = {
      method: 'POST',
      headers: editingHeaders,
      body: imageEdit,
      redirect: 'follow'
    };

    Promise.all([
      fetch(`https://api.intern.d-tt.nl/api/houses/${house.id}/upload`, editImageOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)),
      fetch(`https://api.intern.d-tt.nl/api/houses/${house.id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    ]).then((values) => {
      headerFetch()
        .then(() => navigate("/house", { replace: true }))

    });
  }
  const isButtonDisabled = street === '' || houseNum === '' || postalCode === '' || city === '' || price === '' || size === '' || garage === '' || bedroom === '' || bathroom === '' || constructionDate === '' || description === '' || !prevImage

  return (
    <div className='create-post'>

      <Link className='back' to='/'>Back to overview</Link>
      <h2>Edit listing</h2>
      <div className='all-inputs' >
        <SingleInput value={street} required label={'Street name*'} placeholder={'Enter the street name'} onChange={(e) => setStreet(e.target.value)}></SingleInput>
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



