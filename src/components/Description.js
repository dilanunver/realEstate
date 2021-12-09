import React, { useState } from "react";

const Description = ({ required, value, label, placeholder, onChange }) => {

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const handleDescription = (e) => {
    setShowErrorMessage(true)
    onChange(e)
  }

  const isEmptyValue = required && value === '' && showErrorMessage;

  return (

    <div className="single-input">
      <label>{label}</label>
      <textarea value={value} required className={`text-area ${isEmptyValue && 'empty'} `} placeholder={placeholder} onChange={handleDescription}>
      </textarea>
      {isEmptyValue && <div className='error-message'>Required field missing</div>}
    </div>



  )
}
export default Description