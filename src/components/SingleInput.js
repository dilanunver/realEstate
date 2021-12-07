import React from "react";

const SingleInput = ({ value, onChange, className = 'single-input', label, placeholder, required, isPosted }) => {

  return (
    <div className={className}>
      <label>{label}</label>
      <input value={value} type='text' placeholder={placeholder} onChange={onChange}></input>
      {required && isPosted && value === '' && <p style={{ color: 'red' }}>this field is required</p>}
    </div>
  )
}

export default SingleInput