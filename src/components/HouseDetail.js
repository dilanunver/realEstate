import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import location from '../pictures/location.png'
import pricePc from '../pictures/price.png'
import sizePc from '../pictures/ic_size.png'
import builtPc from '../pictures/construction.png'
import bedPc from '../pictures/ic_bed.png'
import bathPc from '../pictures/ic_bath.png'
import garagePc from '../pictures/ic_garage.png'
import { LoremIpsum } from 'react-lorem-ipsum';
import deleteObj from '../pictures/delete.png'
import editObj from '../pictures/edit.png'
import Modal from 'react-modal'
import Recommended from "./Recommended";



const HouseDetail = ({ detailForHouses, recommendedShuffled, headerFetch }) => {


  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const LoremComp = useMemo(() => (
    <LoremIpsum p={1} />
  ), [])

  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");


  const deleteHeaders = new Headers();
  deleteHeaders.append("X-Api-Key", "pWdHLoqaRIgeXl79-CnOmv0KJ6ANYBt4");

  var deleteOptions = {
    method: 'DELETE',
    headers: deleteHeaders,
    redirect: 'follow'
  };

  const deletingItems = async () => {
    const url = `https://api.intern.d-tt.nl/api/houses/${detailForHouses.id}`
    await fetch(url, deleteOptions)
    await headerFetch()
    setIsModalOpen(false)
    navigate("/house", { replace: true })
  }
  const editingItems = () => {
    navigate("/editHouse", { replace: true })
  }



  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '510px',
      height: '300px',
      borderRadius: '15px'
    }
  }

  return (
    <div className="flex">
      <div className='postted-house'>
        <Link className='back' to='/'>Back to overview</Link>
        <div className="house-detail">
          <div className="bc-white"

            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img src={detailForHouses.image} className='postted' alt='postted'></img>

            <div className="holding-items">
              <h2 className="postted-header">{detailForHouses.location.street}</h2>
              {isHovering &&
                <span className="hovering-items">
                  <Link to={`/editHouse/${detailForHouses.id}`}><img className="editObj" src={editObj} alt="editObj" onClick={editingItems} /></Link>
                  <img className="deleteObj" src={deleteObj} alt="deleteObj" onClick={() => setIsModalOpen(true)} />
                </span>
              }
              <Modal
                isOpen={isModalOpen}
                style={customStyles}
                ariaHideApp={false}
              >
                <div className="modal">
                  <h1>Delete listing</h1>
                  <p>Are you sure want to delete this listing? <br />
                    This action cannot be undone.</p>
                  <div className="modal-button">
                    <button className="yes" onClick={deletingItems}>YES, DELETE</button>
                    <button onClick={() => setIsModalOpen(false)} className="no">GO BACK</button>
                  </div>
                </div>
              </Modal>
            </div>
            <div className='postted-city'>
              <img className="location" src={location} alt="location"></img> {detailForHouses.location.zip} {detailForHouses.location.city}
            </div>
            <div className='postted-price'>
              <img className="price-pc" src={pricePc} alt="price"></img> {detailForHouses.price}
              <img className="size-pc" src={sizePc} alt="size"></img><div className='size-pc'>{detailForHouses.size} m2</div>
              <img className="built-pc" src={builtPc} alt="built"></img> Built in {detailForHouses.constructionYear}
            </div>
            <div className='postted-insideHouse'>
              <img className="bed-pc" src={bedPc} alt="bed-pc"></img><span className="inside-house">{detailForHouses.rooms.bedrooms}</span>
              <img className="bath-pc" src={bathPc} alt="bath-pc"></img><span className="inside-house">{detailForHouses.rooms.bathrooms}</span>
              <img className="garage-pc" src={garagePc} alt="garage-pc"></img><span className="inside-house">
                {detailForHouses.hasGarage ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="loremipsum">
              {detailForHouses.description}
            </div>
          </div>
        </div>

      </div>
      <div className="recommended">
        <h2> Recommended for you</h2>
        {recommendedShuffled.map(element => {
          return (
            <Recommended element={element}></Recommended>

          )
        })}

      </div>
    </div>

  )

}

export default HouseDetail;