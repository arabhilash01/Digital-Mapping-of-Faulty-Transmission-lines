import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import vid1 from "./videos/video1.mp4";
function HeroSection() {
  return (
    <div className='hero-container'>
      <video  autoPlay loop muted >
        <source src={vid1} type="video/mp4"/>
        </video>
      <h3>DIGITAL MAPPING OF FAULTY TRANSMISSION LINES</h3>
      
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Join Us
        </Button>
       
      </div>
    </div>
  );
}

export default HeroSection;