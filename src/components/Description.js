import React from "react";

const Description = ({ required, isPosted, value, label, placeholder, onChange }) => {

  const isEmptyValue = required && isPosted && value === '';
  return (

    <div className="single-input">
      <label>{label}</label>
      <textarea value={value} isPosted={isPosted} required className={`text-area ${isEmptyValue && 'empty'} `} placeholder={placeholder} onChange={onChange}>
      </textarea>
    </div>



  )
}
export default Description