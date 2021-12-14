import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import housepic from '../pictures/housepic.png'
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


const HouseDetail = () => {

  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const LoremComp = useMemo(() => (
    <LoremIpsum p={1} />
  ), [])

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
    <div className='postted-house'>
      <Link className='back' to='/house'>Back to overview</Link>
      <div className="house-detail">
        <div className="bc-white"

          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img src={housepic} className='postted' alt='postted'></img>

          <div className="holding-items">
            <h2 className="postted-header">Stokvisstraat 132</h2>
            {isHovering &&
              <span className="hovering-items">
                <img className="editObj" src={editObj} alt="editObj" />
                <img className="deleteObj" src={deleteObj} alt="deleteObj" onClick={() => setIsModalOpen(true)} />
              </span>
            }
            <Modal
              isOpen={isModalOpen}
              style={customStyles}
            >
              <div className="modal">
                <h1>Delete listing</h1>
                <p>Are you sure want to delete this listing? <br />
                  This action cannot be undone.</p>
                <div className="modal-button">
                  <button className="yes">YES, DELETE</button>
                  <button onClick={() => setIsModalOpen(false)} className="no">GO BACK</button>
                </div>
              </div>
            </Modal>
          </div>
          <div className='postted-city'>

            <img className="location" src={location} alt="location"></img> 1011 AA Amsterdam
          </div>
          <div className='postted-price'>
            <img className="price-pc" src={pricePc} alt="price"></img> 500.000
            <img className="size-pc" src={sizePc} alt="size"></img><div className='size-pc'>120 m2</div>
            <img className="built-pc" src={builtPc} alt="built"></img> Built in 1990
          </div>

          <div className='postted-insideHouse'>
            <img className="bed-pc" src={bedPc} alt="bed-pc"></img><span>1</span>
            <img className="bath-pc" src={bathPc} alt="bath-pc"></img><span>1</span>
            <img className="garage-pc" src={garagePc} alt="garage-pc"></img><span>Yes</span>
          </div>
          <div className="loremipsum">
            {LoremComp}
          </div>
        </div>
      </div>
    </div>
  )

}

export default HouseDetail;