import React, { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

const StyledInput = styled("input")({
  width: "100%",
  padding: "1rem",
  fontSize: "18px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    borderColor: "#3399FF",
  },
});

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
    <Box sx={{ margin: "1rem" }}>
      <LoadScript googleMapsApiKey={apikey} libraries={["places"]}>
      <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChange}
        >
          <StyledInput
            type="text"
            className="form-control"
            placeholder="Enter Location"
          />
        </StandaloneSearchBox>
      </LoadScript>
    </Box>
  );
};

export default DailySearchbar;
     
