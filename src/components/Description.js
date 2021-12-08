import React from "react";

const Description = ({ required, value, label, placeholder, onChange }) => {

  const isEmptyValue = required && value === '';

  return (

    <div className="single-input">
      <label>{label}</label>
      <textarea value={value} required className={`text-area ${isEmptyValue && 'empty'} `} placeholder={placeholder} onChange={onChange}>
      </textarea>
    </div>



  )
}
export default Description