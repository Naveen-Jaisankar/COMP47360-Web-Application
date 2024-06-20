// https://www.youtube.com/watch?v=jwcJ1CZ1-A4
// https://www.youtube.com/watch?v=pDPOwmBzBd8&t=108s

import React from "react";
import { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const DailySearchbar = () => {
  const inputRef = useRef();
  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  let timeoutId;

  const handlePlaceChange = () => {
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (inputRef.current && inputRef.current.getPlaces) {
        const places = inputRef.current.getPlaces();
        if (places && places.length > 0) {
          const place = places[0];
          console.log(place.formatted_address);
          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
        }
      }
    }, 300); 
  };

  return (
    <LoadScript googleMapsApiKey={apikey} libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChange}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
          style={{}}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default DailySearchbar;
