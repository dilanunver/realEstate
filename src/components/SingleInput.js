import React from "react";

const SingleInput = ({ value, onChange, className = 'single-input', label, placeholder, required, isPosted }) => {

  const isEmptyValue = required && isPosted && value === ''

  return (

    <div className={className}>
      <label>{label}</label>
      <input value={value} placeholder={placeholder} className={` ${isEmptyValue && 'empty'}`} onChange={onChange}></input>
      {isEmptyValue && <div className='error-message'>Required field missing</div>}
    </div>


  )
}

export default SingleInput