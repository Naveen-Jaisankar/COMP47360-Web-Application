import React, { useRef } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import {SearchIcon} from '@mui/icons-material/Search'

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
  const placeslib = ["places"];

  const nyBounds = {
    south: 40.477399,
    west: -74.259090,
    north: 40.917577,
    east: -73.700272,
  };

  const handlePlaceChange = () => {
    if (inputRef.current && inputRef.current.getPlace) {
      const place = inputRef.current.getPlace();

      if (place && place.geometry && place.geometry.location) {
        console.log(place.formatted_address);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
      }
    }
  };

  return (
    <Box sx={{ margin: "1rem" }}>
      <LoadScript googleMapsApiKey={apikey} libraries={placeslib}>
        <Autocomplete
          onLoad={(ref) => (inputRef.current = ref)}
          onPlaceChanged={handlePlaceChange}
          options={{
            bounds: nyBounds,
            strictBounds: true,
          }}
        >
          <StyledInput
            type="text"
            className="form-control"
            placeholder="Enter Location"
          />
        </Autocomplete>
      </LoadScript>
    </Box>
  );
};

export default DailySearchbar;
