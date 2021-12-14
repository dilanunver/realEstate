import React from "react";
import housepic from '../pictures/housepic.png'
import bedPc from '../pictures/ic_bed.png'
import bathPc from '../pictures/ic_bath.png'
import sizePc from '../pictures/ic_size.png'

const Recommended = () => {
  return (


    <div className="recommended-items">
      <img src={housepic} className='recommended-postted' alt='postted'></img>
      <div className="recommended-info">
        <h2 className="recommended-header">Stokvisstraat 132</h2>
        <div className='recommended-price'>
          <p className="recommended-price-pc" alt="price"> € 500.000</p>
          <p className="recommended-location-pc" alt="location"> 1011 AA Amsterdam</p>
        </div>


        <div className='recommended-insideHouse'>
          <img className="recommended-bed-pc" src={bedPc} alt="bed-pc"></img><span>1</span>
          <img className="recommended-bath-pc" src={bathPc} alt="bath-pc"></img><span>1</span>
          <img className="recommended-size-pc" src={sizePc} alt="size"></img><div className='size-pc'>120 m2</div>

        </div>
      </div>
    </div>

  )
}

export default Recommended