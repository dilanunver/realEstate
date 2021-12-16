import React from "react";
import bedPc from '../pictures/ic_bed.png'
import bathPc from '../pictures/ic_bath.png'
import sizePc from '../pictures/ic_size.png'

const Recommended = ({ element }) => {





  return (

    <div className="recommended-items">

      <img src={element.image} className='recommended-postted' alt='postted'></img>
      <div className="recommended-info">
        <h2 className="recommended-header">{element.location.street}</h2>
        <div className='recommended-price'>
          <p className="recommended-price-pc" alt="price"> € {element.price}</p>
          <p className="recommended-location-pc" alt="location"> {element.location.zip} {element.location.city}</p>
        </div>


        <div className='recommended-insideHouse'>
          <img className="recommended-bed-pc" src={bedPc} alt="bed-pc"></img><span>{element.rooms.bedrooms}</span>
          <img className="recommended-bath-pc" src={bathPc} alt="bath-pc"></img><span>{element.rooms.bathrooms}</span>
          <img className="recommended-size-pc" src={sizePc} alt="size"></img><div className='size-pc'>{element.size}m2</div>

        </div>
      </div>





    </div>

  )
}

export default Recommended