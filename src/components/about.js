import React from 'react'
import { LoremIpsum } from 'react-lorem-ipsum'
import logo from '../pictures/logo.png'
const About = () => {
  return (
    <div className='about-page'>
      <h1>About DTT Real Estate</h1>
      <p className='about-lorem'>  <LoremIpsum p={1}></LoremIpsum></p>
      <h1 className='design'>Desing and Development</h1>
      <div className='img-link'>
        <img className='logo-about' src={logo} alt='logo' />
        <span className='dtt-link'>
          <p>By DTT</p>
          <a href='https://www.d-tt.nl/'>www.d-tt.nl</a>
        </span>
      </div>
    </div>
  )
}


export default About