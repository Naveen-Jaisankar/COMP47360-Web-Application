import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import GeneralHealthSection from './GeneralHealth';
import UserAge from './UserAge';


const Starting = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
      <Slider {...settings}>
          <div>
            <UserAge nextStep = {next}/>
          </div>
          <div>
            <GeneralHealthSection nextStep={next} />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Starting;
