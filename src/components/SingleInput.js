import React, { useState } from "react";

const SingleInput = ({ value, onChange, className = 'single-input', label, placeholder, required }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleOnChange = (e) => {
    setShowErrorMessage(true)

    onChange(e)
  }

  const isEmptyValue = required && value === '' && showErrorMessage


  return (

    <div className={className}>
      <label>{label}</label>
      <input value={value} placeholder={placeholder} className={` ${isEmptyValue && 'empty'}`} onChange={handleOnChange}></input>
      {isEmptyValue && <div className='error-message'>Required field missing</div>}
    </div>


  )
}

export default SingleInput